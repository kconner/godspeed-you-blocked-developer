variable "aws-region" {}
variable "app-name" {}
variable "app-stage" {}

locals {
  app-prefix = "${var.app-name}-${var.app-stage}"
}

terraform {
  backend "s3" {}
}

provider "aws" {
  region  = "${var.aws-region}"
  version = "~> 1.10"
}

# DynamoDB tables

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

# Lambda functions

module "authorize-function" {
  source         = "./lambda-function"
  qualified-name = "${local.app-prefix}-authorize"
  handler        = "authorize.authorize"
  artifact-file  = "api.zip"
}

module "getState-function" {
  source         = "./lambda-function"
  qualified-name = "${local.app-prefix}-getState"
  handler        = "getState.getState"
  artifact-file  = "api.zip"

  environment-variables {
    GYBD_TABLE_STATES = "${aws_dynamodb_table.states.name}"
  }
}

# resource "aws_cloudwatch_log_group" "lambda-getStates" {
#   name = "/aws/lambda/${local.app-prefix}-getStates"
# }

# REST API

resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app-prefix}-api"
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
