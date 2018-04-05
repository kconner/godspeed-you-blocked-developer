# Policy documents

data "aws_iam_policy_document" "get_item_from_state_table" {
  statement {
    actions   = ["dynamodb:GetItem"]
    resources = ["${aws_dynamodb_table.state.arn}"]
  }
}

data "aws_iam_policy_document" "put_item_in_account_table" {
  statement {
    actions   = ["dynamodb:PutItem"]
    resources = ["${aws_dynamodb_table.account.arn}"]
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
    STATE_TABLE_NAME = "${aws_dynamodb_table.state.name}"
  }
}

resource "aws_iam_role_policy" "getState_get_item_from_state_table" {
  role   = "${module.function_getState.execution_role_id}"
  policy = "${data.aws_iam_policy_document.get_item_from_state_table.json}"
  name   = "get-item-from-state-table"
}

# postAccount

module "function_postAccount" {
  source         = "./modules/lambda-function"
  function_name  = "${local.app_prefix}-postAccount"
  handler        = "build/postAccount.postAccount"
  package_bucket = "${var.artifact_bucket}"
  package_key    = "${var.artifact_version}/api.zip"

  environment_variables {
    ACCOUNT_TABLE_NAME = "${aws_dynamodb_table.account.name}"
  }
}

resource "aws_iam_role_policy" "postAccount_put_item_in_account_table" {
  role   = "${module.function_postAccount.execution_role_id}"
  policy = "${data.aws_iam_policy_document.put_item_in_account_table.json}"
  name   = "put-item-in-account-table"
}
