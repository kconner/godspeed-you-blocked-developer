terraform {
  backend "s3" {}
}

provider "aws" {
  version = "~> 1.10"
  region  = "${var.aws_region}"
}

variable "aws_region" {}
variable "aws_account_id" {}
variable "app_name" {}
variable "app_stage" {}

locals {
  app_prefix = "${var.app_name}-${var.app_stage}"
}

# DynamoDB

resource "aws_dynamodb_table" "states" {
  name     = "${local.app_prefix}-states"
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
module "authorize" {
  source         = "./lambda-function"
  qualified_name = "${local.app_prefix}-authorize"
  handler        = "authorize.authorize"
  artifact_file  = "api.zip"
}

## getState
module "getState" {
  source         = "./lambda-function"
  qualified_name = "${local.app_prefix}-getState"
  handler        = "getState.getState"
  artifact_file  = "api.zip"

  environment_variables {
    GYBD_TABLE_STATES = "${aws_dynamodb_table.states.name}"
  }
}

data "aws_iam_policy_document" "getState_dynamo" {
  statement {
    actions   = ["dynamodb:GetItem"]
    resources = ["${aws_dynamodb_table.states.arn}"]
  }
}

resource "aws_iam_role_policy" "getState_dynamo" {
  role   = "${module.getState.execution_role_id}"
  policy = "${data.aws_iam_policy_document.getState_dynamo.json}"
  name   = "dynamo"
}

# API Gateway

resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app_prefix}-api"
}

## Authorizer

resource "aws_api_gateway_authorizer" "authorize" {
  rest_api_id    = "${aws_api_gateway_rest_api.api.id}"
  authorizer_uri = "${module.authorize.invocation_arn}"
  name           = "authorize"
}

resource "aws_lambda_permission" "authorizer_apigateway_invocation_permission" {
  statement_id  = "APIGatewayInvocation"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = "${module.authorize.arn}"

  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${aws_api_gateway_rest_api.api.id}/authorizers/${aws_api_gateway_authorizer.authorize.id}"
}

## Endpoints

### /states
resource "aws_api_gateway_resource" "states" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "states"
}

### /states/:stateID
resource "aws_api_gateway_resource" "states_stateID" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_resource.states.id}"
  path_part   = "{stateID}"
}

### GET /states/:stateID
resource "aws_api_gateway_method" "states_stateID_get" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.states_stateID.id}"
  http_method = "GET"

  api_key_required = true

  authorization = "CUSTOM"
  authorizer_id = "${aws_api_gateway_authorizer.authorize.id}"
}

### GET /states/:stateID -> Lambda
resource "aws_api_gateway_integration" "states_stateID_get_integration" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.states_stateID.id}"
  http_method = "${aws_api_gateway_method.states_stateID_get.http_method}"

  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = "${module.getState.invocation_arn}"
}

### Allow invoking Lambda
resource "aws_lambda_permission" "getState_apigateway_invocation_permission" {
  statement_id  = "APIGatewayInvocation"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = "${module.getState.arn}"

  # TODO: replace * with ${var.app_stage}
  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.states_stateID_get.http_method}${aws_api_gateway_resource.states_stateID.path}"
}
