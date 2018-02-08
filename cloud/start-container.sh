#!/bin/sh

docker build -t godspeed-you-blocked-developer-cloud . \
    && docker run --interactive --tty godspeed-you-blocked-developer-cloud

