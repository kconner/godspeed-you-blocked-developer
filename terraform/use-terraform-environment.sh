#!/bin/bash -e

if [ "$AWS_REGION" == "" ] ; then
    echo 'AWS_REGION must be defined.'
    exit
fi

if [ "$APP_STAGE" == "" ] ; then
    echo 'APP_STAGE must be defined.'
    exit
fi

stage="$APP_STAGE"
region="$AWS_REGION"
bucket="risk-repo-terraform-$stage"
key="terraform.tfstate"

aws s3api create-bucket --region "$region" --bucket "$bucket"

echo "Using S3 bucket $bucket"

terraform init \
    -backend-config="region=$region" \
    -backend-config="bucket=$bucket" \
    -backend-config="key=$key"

echo "Using environment $stage"

backend_config_file="current-environment.auto.tfvars"
cat <<EOF > "$backend_config_file"
region = "$region"
EOF

echo "Wrote $backend_config_file"
