variable "function_name" {
  description = "Name of the function, unique within the provider's AWS account, like chatbot-prod-sayHello"
}

variable "handler" {
  description = "Path to the handler function within the artifact package, like src/chatbot.sayHello"
}

variable "package_bucket" {
  description = "Name of an S3 bucket where the package is archived, like chatbot-artifacts"
}

variable "package_key" {
  description = "Path to the package in the bucket, like version-1.0/api.zip"
}

variable "environment_variables" {
  description = "Map of environment variables available to the function, like { GREETING: \"O hai Mark\" }"

  default = {
    UNUSED = ""
  }
}
