# authorize

module "authorize" {
  source        = "./lambda-function"
  function_name = "${local.app_prefix}-authorize"
  handler       = "authorize.authorize"
  artifact_file = "api.zip"
}

# getState

module "getState" {
  source        = "./lambda-function"
  function_name = "${local.app_prefix}-getState"
  handler       = "getState.getState"
  artifact_file = "api.zip"

  environment_variables {
    GYBD_TABLE_STATES = "${aws_dynamodb_table.states.name}"
  }
}

data "aws_iam_policy_document" "getState_dynamo" {
  statement {
    actions   = ["dynamodb:GetItem"]
    resources = ["${aws_dynamodb_table.states.arn}"]
  }
}

resource "aws_iam_role_policy" "getState_dynamo" {
  role   = "${module.getState.execution_role_id}"
  policy = "${data.aws_iam_policy_document.getState_dynamo.json}"
  name   = "dynamo"
}
