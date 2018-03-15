output "authorizer_id" {
  description = "ID of the authorizer, from aws_api_gateway_authorizer::id"
  value       = "${aws_api_gateway_authorizer.authorizer.id}"
}
