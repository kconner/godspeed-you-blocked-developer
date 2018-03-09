# "${var.app-name}-${var.app-stage}-foo"
variable "qualified-name" {}

# "path/file.function"
variable "handler" {}

# "build-product.zip"
variable "artifact-file" {}

variable "environment-variables" {
  type = "map"

  default = {
    UNUSED = ""
  }
}

resource "aws_cloudwatch_log_group" "log-group" {
  name = "/aws/lambda/${var.qualified-name}"
}

data "aws_iam_policy_document" "assume-role-policy-document" {
  statement {
    sid     = "1"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda-execution" {
  assume_role_policy = "${data.aws_iam_policy_document.assume-role-policy-document.json}"
  name               = "${var.qualified-name}-lambda-execution"
}

data "aws_iam_policy_document" "execution-policy-document" {
  statement {
    sid       = "1"
    actions   = ["logs:CreateLogStream"]
    resources = ["${aws_cloudwatch_log_group.log-group.arn}"]
  }

  statement {
    sid       = "2"
    actions   = ["logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.log-group.arn}:*"]
  }
}

resource "aws_iam_role_policy" "execution-policy" {
  role   = "${aws_iam_role.lambda-execution.id}"
  policy = "${data.aws_iam_policy_document.execution-policy-document.json}"
  name   = "${var.qualified-name}-execution-policy"
}

resource "aws_lambda_function" "function" {
  function_name    = "${var.qualified-name}"
  handler          = "${var.handler}"
  filename         = "${var.artifact-file}"
  source_code_hash = "${base64sha256(file("${var.artifact-file}"))}"
  runtime          = "nodejs6.10"
  role             = "${aws_iam_role.lambda-execution.arn}"

  environment {
    variables = "${var.environment-variables}"
  }
}
