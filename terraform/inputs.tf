variable "aws_region" {
  description = "AWS region where resources are deployed, like us-east-1"
}

variable "aws_account_id" {
  description = "ID of the account that owns AWS resources, like 1234543210"
}

variable "app_name" {
  description = "Name of the deployed product, like chatbot"
}

variable "app_stage" {
  description = "Name of the product's deployed stage, like prod"
}

variable "artifact_bucket" {
  description = "Name of an S3 bucket where artifacts are archived, like chatbot-artifacts"
}

variable "artifact_version" {
  description = "Version identifier for artifacts to be deployed, like version-1.0"
}
