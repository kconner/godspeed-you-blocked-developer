#!/bin/bash -e

if [ "$AWS_REGION" == "" ] ; then
    echo 'AWS_REGION must be defined.'
    exit
fi

if [ "$APP_NAME" == "" ] ; then
    echo 'APP_NAME must be defined.'
    exit
fi

if [ "$APP_STAGE" == "" ] ; then
    echo 'APP_STAGE must be defined.'
    exit
fi

region="$AWS_REGION"
account_id=$( aws sts get-caller-identity --output text --query Account )
name="$APP_NAME"
stage="$APP_STAGE"
bucket="$name-$stage-terraform"
key="terraform.tfstate"

if $( ! aws s3api head-bucket --region "$region" --bucket "$bucket" ) ; then
    echo "Didn't find Terraform state bucket $bucket."
    echo 'To create it now, type "initialize".'

    read should_proceed
    if [ "initialize" != "$should_proceed" ] ; then
        echo "Aborting."
        exit 1
    fi

    aws s3api create-bucket --region "$region" --bucket "$bucket"
fi

echo "Using S3 bucket $bucket"

# TODO: Remove state only when the backend config file doesn't match what we will overwrite it with, which indicates we are talking about a different environment.
rm .terraform/terraform.tfstate

terraform init \
    -backend-config="region=$region" \
    -backend-config="bucket=$bucket" \
    -backend-config="key=$key"

echo "Using environment $stage for $name"

backend_config_file="current-environment.auto.tfvars"
cat <<EOF > "$backend_config_file"
aws_region = "$region"
aws_account_id = "$account_id"
app_name = "$name"
app_stage = "$stage"
EOF

echo "Wrote $backend_config_file"
