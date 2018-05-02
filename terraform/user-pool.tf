resource "aws_cognito_user_pool" "users" {
  name = "${local.resource_prefix}-users"

  password_policy {
    minimum_length = 12
  }
}

resource "aws_cognito_user_pool_client" "users_api" {
  name             = "${local.resource_prefix}-users-api"
  user_pool_id     = "${aws_cognito_user_pool.users.id}"
  read_attributes  = ["email", "email_verified"]
  write_attributes = ["email"]
}
