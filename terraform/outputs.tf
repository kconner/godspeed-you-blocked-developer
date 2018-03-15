output "inputs" {
  description = "Map of inputs used to deploy the last state"

  value = {
    aws_region       = "${var.aws_region}"
    aws_account_id   = "${var.aws_account_id}"
    app_name         = "${var.app_name}"
    app_stage        = "${var.app_stage}"
    artifact_bucket  = "${var.artifact_bucket}"
    artifact_version = "${var.artifact_version}"
  }
}

output "api_url" {
  description = "Base URL for endpoints, from aws_api_gateway_deployment::invoke_url"
  value       = "${aws_api_gateway_deployment.deployment.invoke_url}"
}

output "api_key" {
  description = "Value of the x-api-key that endpoints expect, from aws_api_gateway_api_key::value"
  value       = "${aws_api_gateway_api_key.api_key.value}"
}
