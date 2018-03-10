variable "aws_region" {}
variable "aws_account_id" {}

variable "rest_api_id" {}
variable "function_arn" {}
variable "function_invocation_arn" {}
variable "authorizer_name" {}

resource "aws_api_gateway_authorizer" "authorizer" {
  rest_api_id    = "${var.rest_api_id}"
  authorizer_uri = "${var.function_invocation_arn}"
  name           = "${var.authorizer_name}"
}

resource "aws_lambda_permission" "api_gateway_authorizer_invocation" {
  statement_id  = "APIGatewayAuthorizerInvocation"
  principal     = "apigateway.amazonaws.com"
  action        = "lambda:InvokeFunction"
  function_name = "${var.function_arn}"

  source_arn = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${var.rest_api_id}/authorizers/${aws_api_gateway_authorizer.authorizer.id}"
}

output "authorizer_id" {
  value = "${aws_api_gateway_authorizer.authorizer.id}"
}
