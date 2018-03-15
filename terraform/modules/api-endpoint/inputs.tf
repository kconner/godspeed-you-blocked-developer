variable "aws_region" {
  description = "AWS region where the API is deployed, like us-east-1"
}

variable "aws_account_id" {
  description = "ID of the account that owns the API, like 1234543210"
}

variable "rest_api_id" {
  description = "ID of the endpoint's parent REST API, from aws_api_gateway_rest_api::id"
}

variable "resource_id" {
  description = "ID of the endpoint's parent resource, from aws_api_gateway_resource::id"
}

variable "resource_path" {
  description = "Path of the endpoint's parent resource, from aws_api_gateway_resource::path"
}

variable "http_method" {
  description = "HTTP method used to make a request to the endpoint, like GET"
}

variable "function_arn" {
  description = "ARN of a Lambda function that handles the endpoint's requests, from aws_lambda_function::arn"
}

variable "function_invocation_arn" {
  description = "Invocation ARN of a Lambda function that handles the endpoint's requests, from aws_lambda_function::invoke_arn"
}

variable "authorizer_id" {
  description = "ID of an authorizer used to allow the endpoint call, from aws_api_gateway_authorizer::id"
}
