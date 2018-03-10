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
  name               = "${var.function_name}-execution"
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
