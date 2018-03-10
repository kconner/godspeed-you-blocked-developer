resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app_prefix}-api"
}

# Authorizer

module "api_authorizer" {
  source                  = "./api-authorizer"
  aws_region              = "${var.aws_region}"
  aws_account_id          = "${var.aws_account_id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  function_arn            = "${module.function_authorize.arn}"
  function_invocation_arn = "${module.function_authorize.invocation_arn}"
  authorizer_name         = "authorize"
}

# Resources

resource "aws_api_gateway_resource" "states" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "states"
}

resource "aws_api_gateway_resource" "states_stateID" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_resource.states.id}"
  path_part   = "{stateID}"
}

# Endpoints

module "endpoint_get_states_stateID" {
  source = "./api-endpoint"

  aws_region     = "${var.aws_region}"
  aws_account_id = "${var.aws_account_id}"

  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.states_stateID.id}"
  resource_path           = "${aws_api_gateway_resource.states_stateID.path}"
  http_method             = "GET"
  function_arn            = "${module.function_getState.arn}"
  function_invocation_arn = "${module.function_getState.invocation_arn}"
  authorizer_id           = "${module.api_authorizer.authorizer_id}"
}

# Deployment

resource "aws_api_gateway_deployment" "deployment" {
  # Specifically, we need these modules' integrations to be created.
  depends_on = ["module.endpoint_get_states_stateID"]

  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${var.app_stage}"
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
