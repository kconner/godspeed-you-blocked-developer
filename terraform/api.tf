resource "aws_api_gateway_rest_api" "api" {
  name = "${local.app_prefix}-api"
}

# Authorizer

resource "aws_api_gateway_authorizer" "authorize" {
  rest_api_id    = "${aws_api_gateway_rest_api.api.id}"
  authorizer_uri = "${module.authorize.invocation_arn}"
  name           = "authorize"
}

resource "aws_lambda_permission" "authorizer_apigateway_invocation" {
  statement_id  = "APIGatewayInvocation"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = "${module.authorize.arn}"

  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${aws_api_gateway_rest_api.api.id}/authorizers/${aws_api_gateway_authorizer.authorize.id}"
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

resource "aws_api_gateway_method" "states_stateID_get" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.states_stateID.id}"
  http_method = "GET"

  api_key_required = true

  authorization = "CUSTOM"
  authorizer_id = "${aws_api_gateway_authorizer.authorize.id}"
}

resource "aws_api_gateway_integration" "states_stateID_get" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_resource.states_stateID.id}"
  http_method = "${aws_api_gateway_method.states_stateID_get.http_method}"

  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = "${module.getState.invocation_arn}"
}

resource "aws_lambda_permission" "getState_apigateway_invocation" {
  statement_id  = "APIGatewayInvocation"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = "${module.getState.arn}"

  # TODO: replace * with ${var.app_stage}
  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.states_stateID_get.http_method}${aws_api_gateway_resource.states_stateID.path}"
}
