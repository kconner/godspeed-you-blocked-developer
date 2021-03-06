resource "aws_api_gateway_method" "method" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${var.http_method}"

  api_key_required = true

  authorization = "CUSTOM"
  authorizer_id = "${var.authorizer_id}"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id = "${var.rest_api_id}"
  resource_id = "${var.resource_id}"
  http_method = "${aws_api_gateway_method.method.http_method}"

  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = "${var.function_invocation_arn}"
}

resource "aws_lambda_permission" "api_gateway_method" {
  statement_id  = "api-gateway-method-${var.resource_id}-${var.http_method}"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = "${var.function_arn}"

  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${var.rest_api_id}/*/${aws_api_gateway_method.method.http_method}${var.resource_path}"
}
