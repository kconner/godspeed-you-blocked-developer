variable "region" {}

terraform {
  backend "s3" {}
}

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
