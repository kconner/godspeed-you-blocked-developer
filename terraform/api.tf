terraform {
  backend "s3" {}
}

provider "aws" {
  region  = "${var.aws-region}"
  version = "~> 1.10"
}

variable "aws-region" {}
variable "aws-account-id" {}
variable "app-name" {}
variable "app-stage" {}

locals {
  app-prefix = "${var.app-name}-${var.app-stage}"
}

# DynamoDB

resource "aws_dynamodb_table" "states" {
  name     = "${local.app-prefix}-states"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  read_capacity  = 1
  write_capacity = 1
}

# Lambda

## authorize
module "authorize-function" {
  source         = "./lambda-function"
  qualified-name = "${local.app-prefix}-authorize"
  handler        = "authorize.authorize"
  artifact-file  = "api.zip"
}

## getState
module "getState-function" {
  source         = "./lambda-function"
  qualified-name = "${local.app-prefix}-getState"
  handler        = "getState.getState"
  artifact-file  = "api.zip"

  environment-variables {
    GYBD_TABLE_STATES = "${aws_dynamodb_table.states.name}"
  }
}

data "aws_iam_policy_document" "getState-policy-document" {
  statement {
    actions   = ["dynamodb:GetItem"]
    resources = ["${aws_dynamodb_table.states.arn}"]
  }
}

resource "aws_iam_role_policy" "getState-policy" {
  role   = "${module.getState-function.execution-role-id}"
  policy = "${data.aws_iam_policy_document.getState-policy-document.json}"
  name   = "${module.getState-function.qualified-name}-dynamo-policy"
}

# API Gateway

resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app-prefix}-api"
}

## Authorizer

data "aws_iam_policy_document" "authorize-invocation-assume-role-policy-document" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "authorize-invocation" {
  assume_role_policy = "${data.aws_iam_policy_document.authorize-invocation-assume-role-policy-document.json}"
  name               = "${module.authorize-function.qualified-name}-invocation"
}

data "aws_iam_policy_document" "authorize-invocation-permission-policy-document" {
  statement {
    actions   = ["lambda:InvokeFunction"]
    resources = ["${module.authorize-function.arn}"]
  }
}

resource "aws_iam_role_policy" "authorize-invocation-permission-policy" {
  role   = "${aws_iam_role.authorize-invocation.id}"
  policy = "${data.aws_iam_policy_document.authorize-invocation-permission-policy-document.json}"
  name   = "${module.authorize-function.qualified-name}-invocation-permission-policy"
}

resource "aws_api_gateway_authorizer" "authorize" {
  rest_api_id            = "${aws_api_gateway_rest_api.api.id}"
  authorizer_uri         = "${module.authorize-function.invocation-arn}"
  authorizer_credentials = "${aws_iam_role.authorize-invocation.arn}"
  name                   = "authorize"
}

## Resources

### /states
resource "aws_api_gateway_resource" "states" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "states"
}

### /states/:stateID
resource "aws_api_gateway_resource" "states-stateID" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_resource.states.id}"
  path_part   = "{stateID}"
}

## Methods

resource "aws_api_gateway_method" "states-stateID-get" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.states-stateID.id}"
  http_method = "GET"

  api_key_required = true

  authorization = "CUSTOM"
  authorizer_id = "${aws_api_gateway_authorizer.authorize.id}"
}

resource "aws_api_gateway_integration" "states-stateID-get-integration" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.states-stateID.id}"
  http_method = "${aws_api_gateway_method.states-stateID-get.http_method}"

  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = "${module.getState-function.invocation-arn}"
}

resource "aws_lambda_permission" "getState-apigateway-invocation-permission" {
  statement_id  = "APIGatewayInvocation"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = "${module.getState-function.arn}"

  # TODO: replace * with ${var.app-stage}
  source_arn = "arn:aws:execute-api:${var.aws-region}:${var.aws-account-id}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.states-stateID-get.http_method}${aws_api_gateway_resource.states-stateID.path}"
}
