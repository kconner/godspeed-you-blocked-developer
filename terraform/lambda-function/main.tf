# Produces a Lambda function with a log group and access to create it and write to it.
# Add additional policies to the execution role externally.

variable "function_name" {}
variable "handler" {}
variable "artifact_file" {}

variable "environment_variables" {
  type = "map"

  default = {
    UNUSED = ""
  }
}

output "arn" {
  value = "${aws_lambda_function.function.arn}"
}

output "invocation_arn" {
  value = "${aws_lambda_function.function.invoke_arn}"
}

output "execution_role_id" {
  value = "${aws_iam_role.execution.id}"
}
