variable "region" {}

provider "aws" {
  region  = "${var.region}"
  version = "~> 1.10"
}

resource "aws_instance" "example" {
  ami           = "ami-2757f631"
  instance_type = "t2.micro"
}

resource "aws_eip" "ip" {
  instance = "${aws_instance.example.id}"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "testing_a_thing_with_a_tf_workspace_in_${terraform.workspace == "default" ? "dev" : terraform.workspace}"
}

