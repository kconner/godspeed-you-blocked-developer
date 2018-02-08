#!/bin/sh -e

if [ ! "$AWS_PROFILE" == "" ] ; then
    AWS_ACCESS_KEY_ID=$( aws configure get aws_access_key_id --profile "$AWS_PROFILE" )
    AWS_SECRET_ACCESS_KEY=$( aws configure get aws_secret_access_key --profile "$AWS_PROFILE" )
    AWS_REGION=$( aws configure get region --profile "$AWS_PROFILE" )
fi

if [ "$AWS_ACCESS_KEY_ID" == "" ] || [ "$AWS_SECRET_ACCESS_KEY" == "" ] || [ "$AWS_REGION" == "" ] ; then
    echo 'AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION must be defined.'
    echo 'AWS_PROFILE is acceptable if it implies all three.'
    exit
fi

docker build -t godspeed-you-blocked-developer-cloud .

docker run \
    -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
    -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
    -e AWS_REGION="$AWS_REGION" \
    --interactive --tty \
    godspeed-you-blocked-developer-cloud

