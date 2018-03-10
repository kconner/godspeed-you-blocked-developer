resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app_prefix}-api"
}

# Authorizer

module "api_authorizer" {
  source                  = "./api-authorizer"
  aws_region              = "${var.aws_region}"
  aws_account_id          = "${var.aws_account_id}"
  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  function_arn            = "${module.authorize.arn}"
  function_invocation_arn = "${module.authorize.invocation_arn}"
  authorizer_name         = "authorize"
}

# /states

resource "aws_api_gateway_resource" "states" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_rest_api.api.root_resource_id}"
  path_part   = "states"
}

# /states/:stateID

resource "aws_api_gateway_resource" "states_stateID" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  parent_id   = "${aws_api_gateway_resource.states.id}"
  path_part   = "{stateID}"
}

# GET /states/:stateID

module "endpoint_get_states_stateID" {
  source = "./api-endpoint"

  aws_region     = "${var.aws_region}"
  aws_account_id = "${var.aws_account_id}"

  rest_api_id             = "${aws_api_gateway_rest_api.api.id}"
  resource_id             = "${aws_api_gateway_resource.states_stateID.id}"
  resource_path           = "${aws_api_gateway_resource.states_stateID.path}"
  http_method             = "GET"
  function_arn            = "${module.getState.arn}"
  function_invocation_arn = "${module.getState.invocation_arn}"
  authorizer_id           = "${module.api_authorizer.authorizer_id}"
}
