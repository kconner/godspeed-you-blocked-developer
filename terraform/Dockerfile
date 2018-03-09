FROM node:6.10.3

# APT: Python, unzip, curl
RUN DEBIAN_FRONTEND=noninteractive apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends build-essential g++ python2.7 python2.7-dev unzip curl \
    && rm -rf /var/lib/apt/lists/*

# Pip
RUN mkdir -p /tmp \
    && cd /tmp \
    && curl -O https://bootstrap.pypa.io/get-pip.py \
    && python get-pip.py \
    && rm -f /tmp/get-pip.py

# AWS CLI
RUN pip install awscli

# Terraform
RUN mkdir -p /tmp \
    && cd /tmp \
    && curl -O https://releases.hashicorp.com/terraform/0.11.3/terraform_0.11.3_linux_amd64.zip \
    && unzip terraform_0.11.3_linux_amd64.zip \
    && mv terraform /usr/local/bin/

# Infrastructure definition
ADD ./use-terraform-environment.sh /app/use-terraform-environment.sh
ADD ./*.tf /app/
WORKDIR /app

CMD bash
