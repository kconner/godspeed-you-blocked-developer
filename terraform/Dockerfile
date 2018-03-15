FROM node:6.10.3

# APT
RUN DEBIAN_FRONTEND=noninteractive apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends build-essential g++ python2.7 python2.7-dev unzip curl \
    # jq and groff for interactive use of aws-cli; not needed in CI
    && apt-get install -y --no-install-recommends jq groff \
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
COPY . /app
WORKDIR /app

RUN echo "./initialize-terraform.sh" >> /root/.bashrc
CMD bash
