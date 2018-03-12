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
variable "artifact_bucket" {}
variable "artifact_version" {}

locals {
  app_prefix = "${var.app_name}-${var.app_stage}"
}

output "inputs" {
  value = {
    aws_region       = "${var.aws_region}"
    aws_account_id   = "${var.aws_account_id}"
    app_name         = "${var.app_name}"
    app_stage        = "${var.app_stage}"
    artifact_bucket  = "${var.artifact_bucket}"
    artifact_version = "${var.artifact_version}"
  }
}

output "api_key" {
  value = "${aws_api_gateway_api_key.api_key.value}"
}

output "api_url" {
  value = "${aws_api_gateway_deployment.deployment.invoke_url}"
}
