# REST API

resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app_prefix}-api"
}

# Authorizer

module "authorizer_authorize" {
  source                  = "./modules/api-authorizer"
  aws_region              = "${var.aws_region}"
  aws_account_id          = "${var.aws_account_id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  function_arn            = "${module.function_authorize.arn}"
  function_invocation_arn = "${module.function_authorize.invocation_arn}"
  authorizer_name         = "authorize"
}

# Resources

resource "aws_api_gateway_resource" "state" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "state"
}

resource "aws_api_gateway_resource" "state_stateID" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_resource.state.id}"
  path_part   = "{stateID}"
}

resource "aws_api_gateway_resource" "account" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "account"
}

# Endpoints

module "endpoint_get_state_stateID" {
  source = "./modules/api-endpoint"

  aws_region     = "${var.aws_region}"
  aws_account_id = "${var.aws_account_id}"

  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.state_stateID.id}"
  resource_path           = "${aws_api_gateway_resource.state_stateID.path}"
  http_method             = "GET"
  function_arn            = "${module.function_getState.arn}"
  function_invocation_arn = "${module.function_getState.invocation_arn}"
  authorizer_id           = "${module.authorizer_authorize.authorizer_id}"
}

module "endpoint_post_account" {
  source = "./modules/api-endpoint"

  aws_region     = "${var.aws_region}"
  aws_account_id = "${var.aws_account_id}"

  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.account.id}"
  resource_path           = "${aws_api_gateway_resource.account.path}"
  http_method             = "POST"
  function_arn            = "${module.function_postAccount.arn}"
  function_invocation_arn = "${module.function_postAccount.invocation_arn}"
  authorizer_id           = "${module.authorizer_authorize.authorizer_id}"
}

# Deployment

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.app_stage}"

  # API Gateway Deployments are really just POST requests that cause collections of resources
  # to be made available to HTTP. Terraform doesn't think it needs recreate the resource though,
  # so we need to cause it to recreate by changing a property that has that effect.
  # We change it when the artifact version changes and when any part of this file changes.
  # https://github.com/hashicorp/terraform/issues/6613#issuecomment-322264393
  stage_description = "Deployed with version ${var.artifact_version}. API MD5: ${md5(file("api.tf"))}"

  # We also need to recreate this deployment only after API resources have all been updated.
  depends_on = [
    "module.authorizer_authorize",
    "aws_api_gateway_resource.state",
    "aws_api_gateway_resource.state_stateID",
    "aws_api_gateway_resource.account",
    "module.endpoint_get_state_stateID",
    "module.endpoint_post_account",
  ]
}

# API Key and usage plan

resource "aws_api_gateway_api_key" "api_key" {
  name = "${local.app_prefix}-api-key"
}

resource "aws_api_gateway_usage_plan" "usage_plan" {
  name        = "${local.app_prefix}"
  description = "Usage plan for the ${local.app_prefix} API."

  api_stages {
    api_id = "${aws_api_gateway_rest_api.api.id}"
    stage  = "${aws_api_gateway_deployment.deployment.stage_name}"
  }

  quota_settings {
    limit  = 1000
    offset = 0
    period = "DAY"
  }

  throttle_settings {
    burst_limit = 100
    rate_limit  = 1
  }
}

resource "aws_api_gateway_usage_plan_key" "usage_plan_key" {
  usage_plan_id = "${aws_api_gateway_usage_plan.usage_plan.id}"
  key_id        = "${aws_api_gateway_api_key.api_key.id}"
  key_type      = "API_KEY"
}
