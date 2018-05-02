# Log group

resource "aws_cloudwatch_log_group" "log_group" {
  name = "/aws/lambda/${var.function_name}"
}

# Execution role

data "aws_iam_policy_document" "lambda_may_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "execution" {
  assume_role_policy = "${data.aws_iam_policy_document.lambda_may_assume_role.json}"
  name               = "${var.function_name}-execution"
}

# Log group policy

data "aws_iam_policy_document" "write_to_log_streams" {
  statement {
    actions   = ["logs:CreateLogStream"]
    resources = ["${aws_cloudwatch_log_group.log_group.arn}"]
  }

  statement {
    actions   = ["logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.log_group.arn}:*"]
  }
}

resource "aws_iam_role_policy" "write_to_log_streams" {
  role   = "${aws_iam_role.execution.id}"
  policy = "${data.aws_iam_policy_document.write_to_log_streams.json}"
  name   = "write-to-log-streams"
}

# Lambda function

resource "aws_lambda_function" "function" {
  function_name = "${var.function_name}"
  handler       = "${var.handler}"
  s3_bucket     = "${var.package_bucket}"
  s3_key        = "${var.package_key}"
  runtime       = "nodejs8.10"
  role          = "${aws_iam_role.execution.arn}"

  environment {
    variables = "${var.environment_variables}"
  }
}
