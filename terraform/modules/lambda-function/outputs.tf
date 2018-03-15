output "arn" {
  description = "ARN of the Lambda function, from aws_lambda_function::arn"
  value       = "${aws_lambda_function.function.arn}"
}

output "invocation_arn" {
  description = "Invocation ARN of the Lambda function, from aws_lambda_function::invoke_arn"
  value       = "${aws_lambda_function.function.invoke_arn}"
}

output "execution_role_id" {
  description = "ID of function's execution role, from aws_iam_role::id"
  value       = "${aws_iam_role.execution.id}"
}
