variable "aws-region" {}
variable "app-name" {}
variable "app-stage" {}

terraform {
  backend "s3" {}
}

provider "aws" {
  region  = "${var.aws-region}"
  version = "~> 1.10"
}

# DynamoDB tables

resource "aws_dynamodb_table" "states" {
  name     = "${var.app-name}-${var.app-stage}-states"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  read_capacity  = 1
  write_capacity = 1
}

# Lambda functions

resource "aws_cloudwatch_log_group" "authorize" {
  name = "/aws/lambda/${var.app-name}-${var.app-stage}-authorize"
}

data "aws_iam_policy_document" "authorize-assume-role" {
  statement {
    sid     = "1"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda-execution-authorize" {
  assume_role_policy = "${data.aws_iam_policy_document.authorize-assume-role.json}"
  name               = "${var.app-name}-${var.app-stage}-lambda-execution-authorize"
}

data "aws_iam_policy_document" "authorize" {
  statement {
    sid       = "1"
    actions   = ["logs:CreateLogStream"]
    resources = ["${aws_cloudwatch_log_group.authorize.arn}"]
  }

  statement {
    sid       = "2"
    actions   = ["logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.authorize.arn}:*"]
  }
}

resource "aws_iam_role_policy" "authorize-policy" {
  role   = "${aws_iam_role.lambda-execution-authorize.id}"
  policy = "${data.aws_iam_policy_document.authorize.json}"
  name   = "authorize-policy"
}

resource "aws_lambda_function" "authorize" {
  function_name    = "${var.app-name}-${var.app-stage}-authorize"
  handler          = "authorize.authorize"
  filename         = "api.zip"
  source_code_hash = "${base64sha256(file("api.zip"))}"
  runtime          = "nodejs6.10"
  role             = "${aws_iam_role.lambda-execution-authorize.arn}"
}

# resource "aws_cloudwatch_log_group" "lambda-getStates" {
#   name = "/aws/lambda/${var.app-name}-${var.app-stage}-getStates"
# }

# REST API

resource "aws_api_gateway_rest_api" "api" {
  name = "${var.app-name}-${var.app-stage}-api"
}

# /states
resource "aws_api_gateway_resource" "states" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "states"
}

# /states/:stateID
resource "aws_api_gateway_resource" "states-stateID" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_resource.states.id}"
  path_part   = "{stateID}"
}
