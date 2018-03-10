terraform {
  backend "s3" {}
}

provider "aws" {
  version = "~> 1.10"
  region  = "${var.aws_region}"
}

variable "aws_region" {}
variable "aws_account_id" {}
variable "app_name" {}
variable "app_stage" {}

locals {
  app_prefix = "${var.app_name}-${var.app_stage}"
}

output "api_key" {
  value = "${aws_api_gateway_api_key.api_key.value}"
}

output "api_url" {
  value = "${aws_api_gateway_deployment.deployment.invoke_url}"
}
