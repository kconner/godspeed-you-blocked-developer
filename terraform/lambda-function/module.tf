# Produces a Lambda function with a log group and access to create it and write to it.
# Add additional policies to the execution role externally.

# "${var.app_name}-${var.app_stage}-foo"
variable "qualified_name" {}

# "path/file.function"
variable "handler" {}

# "build-product.zip"
variable "artifact_file" {}

variable "environment_variables" {
  type = "map"

  default = {
    UNUSED = ""
  }
}

# Log group

resource "aws_cloudwatch_log_group" "log_group" {
  name = "/aws/lambda/${var.qualified_name}"
}

# Execution role

data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "execution" {
  assume_role_policy = "${data.aws_iam_policy_document.assume_role.json}"
  name               = "${var.qualified_name}-execution"
}

# Log group policy

data "aws_iam_policy_document" "log_group" {
  statement {
    actions   = ["logs:CreateLogStream"]
    resources = ["${aws_cloudwatch_log_group.log_group.arn}"]
  }

  statement {
    actions   = ["logs:PutLogEvents"]
    resources = ["${aws_cloudwatch_log_group.log_group.arn}:*"]
  }
}

resource "aws_iam_role_policy" "log_group" {
  role   = "${aws_iam_role.execution.id}"
  policy = "${data.aws_iam_policy_document.log_group.json}"
  name   = "log-group"
}

# Function

resource "aws_lambda_function" "function" {
  function_name    = "${var.qualified_name}"
  handler          = "${var.handler}"
  filename         = "${var.artifact_file}"
  source_code_hash = "${base64sha256(file("${var.artifact_file}"))}"
  runtime          = "nodejs6.10"
  role             = "${aws_iam_role.execution.arn}"

  environment {
    variables = "${var.environment_variables}"
  }
}

# Outputs

output "qualified_name" {
  value = "${var.qualified_name}"
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
