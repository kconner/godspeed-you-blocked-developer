FROM node:6.10.3

RUN DEBIAN_FRONTEND=noninteractive apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends build-essential g++ python2.7 python2.7-dev unzip curl \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /tmp \
    && cd /tmp \
    && curl -O https://bootstrap.pypa.io/get-pip.py \
    && python get-pip.py \
    && pip install awscli \
    && rm -f /tmp/get-pip.py

# Build environment
ADD ./package.json /app/package.json
WORKDIR /app
RUN npm install

# Source
ADD ./run.sh /app/run.sh
ADD ./serverless.yml /app/serverless.yml
ADD ./src /app/src

CMD bash
