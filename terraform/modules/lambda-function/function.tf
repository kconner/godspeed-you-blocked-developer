resource "aws_lambda_function" "function" {
  function_name = "${var.function_name}"
  handler       = "${var.handler}"
  s3_bucket     = "${var.artifact_bucket}"
  s3_key        = "${var.artifact_key}"
  runtime       = "nodejs6.10"
  role          = "${aws_iam_role.execution.arn}"

  environment {
    variables = "${var.environment_variables}"
  }
}
