#!/bin/sh -e

if [ "$APP_STAGE" == "" ] ; then
    echo 'APP_STAGE must be defined.'
    exit
fi

if [ ! "$AWS_PROFILE" == "" ] ; then
    export AWS_ACCESS_KEY_ID=$( aws configure get aws_access_key_id --profile "$AWS_PROFILE" )
    export AWS_SECRET_ACCESS_KEY=$( aws configure get aws_secret_access_key --profile "$AWS_PROFILE" )
    export AWS_REGION=$( aws configure get region --profile "$AWS_PROFILE" )
fi

if [ "$AWS_ACCESS_KEY_ID" == "" ] || [ "$AWS_SECRET_ACCESS_KEY" == "" ] || [ "$AWS_REGION" == "" ] ; then
    echo 'AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION must be defined.'
    echo 'AWS_PROFILE is acceptable if it implies all three.'
    exit
fi

./run.sh build
./run.sh serverless offline start

