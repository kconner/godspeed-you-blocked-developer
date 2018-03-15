variable "aws_region" {
  description = "AWS region where the API is deployed, like us-east-1"
}

variable "aws_account_id" {
  description = "ID of the account that owns the API, like 1234543210"
}

variable "rest_api_id" {
  description = "ID of the authorizer's parent REST API, from aws_api_gateway_rest_api::id"
}

variable "function_arn" {
  description = "ARN of a Lambda function that performs authorization, from aws_lambda_function::arn"
}

variable "function_invocation_arn" {
  description = "Invocation ARN of a Lambda function that performs authorization, from aws_lambda_function::invoke_arn"
}

variable "authorizer_name" {
  description = "Name for the authorizer, unique within the API, like verify"
}
