FROM node:6.10.3

# APT
RUN DEBIAN_FRONTEND=noninteractive apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends build-essential g++ python2.7 python2.7-dev zip unzip curl \
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

# Yarn
RUN npm install -g yarn

# Build environment
COPY package.json yarn.lock /app/
WORKDIR /app
RUN yarn

# Source
COPY tsconfig.json /app/
COPY src /app/src

CMD bash
