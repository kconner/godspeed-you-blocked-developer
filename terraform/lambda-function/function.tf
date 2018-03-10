resource "aws_lambda_function" "function" {
  function_name    = "${var.function_name}"
  handler          = "${var.handler}"
  filename         = "${var.artifact_file}"
  source_code_hash = "${base64sha256(file("${var.artifact_file}"))}"
  runtime          = "nodejs6.10"
  role             = "${aws_iam_role.execution.arn}"

  environment {
    variables = "${var.environment_variables}"
  }
}
