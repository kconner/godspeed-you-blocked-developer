# Policy documents

data "aws_iam_policy_document" "get_item_from_states_table" {
  statement {
    actions   = ["dynamodb:GetItem"]
    resources = ["${aws_dynamodb_table.states.arn}"]
  }
}

# authorize

module "function_authorize" {
  source         = "./modules/lambda-function"
  function_name  = "${local.app_prefix}-authorize"
  handler        = "build/authorize.authorize"
  package_bucket = "${var.artifact_bucket}"
  package_key    = "${var.artifact_version}/api.zip"
}

# getState

module "function_getState" {
  source         = "./modules/lambda-function"
  function_name  = "${local.app_prefix}-getState"
  handler        = "build/getState.getState"
  package_bucket = "${var.artifact_bucket}"
  package_key    = "${var.artifact_version}/api.zip"

  environment_variables {
    GYBD_TABLE_STATES = "${aws_dynamodb_table.states.name}"
  }
}

resource "aws_iam_role_policy" "getState_get_item_from_states_table" {
  role   = "${module.function_getState.execution_role_id}"
  policy = "${data.aws_iam_policy_document.get_item_from_states_table.json}"
  name   = "get-item-from-states-table"
}
