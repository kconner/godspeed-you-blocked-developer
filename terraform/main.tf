terraform {
  backend "s3" {}
}

provider "aws" {
  version = "~> 1.10"
  region  = "${var.aws_region}"
}

locals {
  resource_prefix = "${var.app_name}-${var.app_stage}"
}
