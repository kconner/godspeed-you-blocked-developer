#!/bin/sh -e

if [ "$AWS_REGION" == "" ] ; then
    echo 'AWS_REGION must be defined.'
    exit
fi

if [ ! "$AWS_PROFILE" == "" ] ; then
    AWS_ACCESS_KEY_ID=$( aws configure get aws_access_key_id --profile "$AWS_PROFILE" )
    AWS_SECRET_ACCESS_KEY=$( aws configure get aws_secret_access_key --profile "$AWS_PROFILE" )
fi

if [ "$AWS_ACCESS_KEY_ID" == "" ] || [ "$AWS_SECRET_ACCESS_KEY" == "" ] ; then
    echo 'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be defined.'
    echo 'AWS_PROFILE is acceptable if it implies both.'
    exit
fi

name=gybd
image="$name-api"
artifact_bucket="$name-artifacts"
artifact_version=$( git log -n 1 --pretty=format:"%H" )

docker build -t "$image" api

docker run \
    -e AWS_REGION="$AWS_REGION" \
    -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
    -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
    -e ARTIFACT_BUCKET="$artifact_bucket" \
    -e ARTIFACT_VERSION="$artifact_version" \
    --interactive --tty \
    "$image"
