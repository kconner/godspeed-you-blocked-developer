resource "aws_dynamodb_table" "states" {
  name     = "${local.app_prefix}-states"
  hash_key = "id"

  attribute {
    name = "id"
    type = "S"
  }

  read_capacity  = 1
  write_capacity = 1

  # TODO: Look into parameterizing this. Find out if it still holds up if you
  # omit the resource block.
  lifecycle {
    prevent_destroy = "true"
  }
}
