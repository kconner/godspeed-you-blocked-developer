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

if [ "$STATE_BUCKET" == "" ] ; then
    echo 'STATE_BUCKET must be defined.'
    exit
fi

if [ "$ARTIFACT_BUCKET" == "" ] ; then
    echo 'ARTIFACT_BUCKET must be defined.'
    exit
fi

region="$AWS_REGION"
account_id=$( aws sts get-caller-identity --output text --query Account )
name="$APP_NAME"
stage="$APP_STAGE"
artifact_bucket="$ARTIFACT_BUCKET"
state_bucket="$STATE_BUCKET"
state_key="terraform.tfstate"

echo "Using stage $stage for $name"

# Backend variables

echo
echo "Preparing Terraform backend variables"

backend_variables_file="current-backend.auto.tfvars"

cat <<EOF > "$backend_variables_file"
aws_region = "$region"
aws_account_id = "$account_id"
app_name = "$name"
app_stage = "$stage"
artifact_bucket = "$artifact_bucket"
EOF

echo "  Wrote $backend_variables_file"

# S3 bucket

echo
if ! aws s3api head-bucket --region "$region" --bucket "$state_bucket" ; then
    echo "Didn't find Terraform state bucket $state_bucket."
    echo 'To create it now, type "initialize".'

    read should_initialize
    if [ "initialize" != "$should_initialize" ] ; then
        echo "Aborting."
        exit 1
    fi

    aws s3api create-bucket --region "$region" --bucket "$state_bucket"
fi

echo "Using S3 bucket $state_bucket"
echo

# Initialize backend and modules

terraform init \
    -reconfigure \
    -backend-config="region=$region" \
    -backend-config="bucket=$state_bucket" \
    -backend-config="key=$state_key"
