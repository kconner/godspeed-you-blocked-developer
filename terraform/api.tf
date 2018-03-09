terraform {
  backend "s3" {}
}

provider "aws" {
  region  = "${var.aws-region}"
  version = "~> 1.10"
}

variable "aws-region" {}
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
  role   = "${module.getState-function.execution-role-name}"
  policy = "${data.aws_iam_policy_document.getState-policy-document.json}"
  name   = "${module.getState-function.qualified-name}-dynamo-policy"
}

# API Gateway

resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app-prefix}-api"
}

## /states
resource "aws_api_gateway_resource" "states" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "states"
}

## /states/:stateID
resource "aws_api_gateway_resource" "states-stateID" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_resource.states.id}"
  path_part   = "{stateID}"
}
