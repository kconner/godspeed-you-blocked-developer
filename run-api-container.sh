#!/bin/sh -e

function print_usage {
    cat << EOF
usage: run-api-container.sh [options] <command>

commands:   bash    Open a shell, from which you can run yarn tasks
            shipit  Build, package, and archive

EOF
}

while [ -n "$1" ] ; do
    case $1 in
    --region)
        shift
        AWS_REGION=$1
        shift
        ;;
    --profile)
        shift
        AWS_PROFILE=$1
        shift
        ;;
    --key)
        shift
        AWS_ACCESS_KEY_ID=$1
        shift
        ;;
    --secret)
        shift
        AWS_SECRET_ACCESS_KEY=$1
        shift
        ;;
    bash)
        shift
        command=(bash)
        ;;
    shipit)
        shift
        command=(yarn shipit)
        ;;
    *)
        print_usage
        exit 1
        ;;
    esac
done

if [ -n "$AWS_PROFILE" ] ; then
    AWS_ACCESS_KEY_ID=$( aws configure get aws_access_key_id --profile "$AWS_PROFILE" )
    AWS_SECRET_ACCESS_KEY=$( aws configure get aws_secret_access_key --profile "$AWS_PROFILE" )
fi

if [ -z "$AWS_REGION" ] ; then
    print_usage
    echo 'required: --region or AWS_REGION'
    exit 1
fi

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ] ; then
    print_usage
    echo 'required: --key or AWS_ACCESS_KEY_ID, and --secret or AWS_SECRET_ACCESS_KEY'
    echo '  or: --profile or AWS_PROFILE if credentials are configured'
    exit 1
fi

if [ -z "$command" ] ; then
    print_usage
    echo 'required: command'
    exit 1
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
    "$image" \
    "${command[@]}"
