resource "aws_dynamodb_table" "state" {
  name     = "${local.app_prefix}-state"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  read_capacity  = 1
  write_capacity = 1

  lifecycle {
    prevent_destroy = "true"
  }
}

resource "aws_dynamodb_table" "account" {
  name     = "${local.app_prefix}-account"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  read_capacity  = 1
  write_capacity = 1

  lifecycle {
    prevent_destroy = "true"
  }
}
