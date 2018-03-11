FROM node:6.10.3

# APT: Python, unzip, curl
RUN DEBIAN_FRONTEND=noninteractive apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends build-essential g++ python2.7 python2.7-dev zip unzip curl \
    && rm -rf /var/lib/apt/lists/*

# Pip
RUN mkdir -p /tmp \
    && cd /tmp \
    && curl -O https://bootstrap.pypa.io/get-pip.py \
    && python get-pip.py \
    && rm -f /tmp/get-pip.py

# AWS CLI
RUN pip install awscli

# Build environment
COPY package.json /app/
WORKDIR /app
RUN npm install

# Source
COPY tsconfig.json /app/
COPY src /app/src

CMD bash
