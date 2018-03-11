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

echo "Using stage $stage for $name"

# Backend variables

echo
echo "Preparing Terraform backend variables"

backend_variables_file="current-backend.auto.tfvars"
tmp_backend_variables_file="/tmp/$backend_variables_file"

cat <<EOF > "$tmp_backend_variables_file"
aws_region = "$region"
aws_account_id = "$account_id"
app_name = "$name"
app_stage = "$stage"
EOF

# When the new backend variables don't match the old ones, we are talking about a different backend.
# That's probably because we are using a different stage, not because we have changed the backend storage location for a stage.
# In that case, clear local state so we don't accidentally overwrite state on the new backend.
if [ -e "$backend_variables_file" ] && ! diff -q "$backend_variables_file" "$tmp_backend_variables_file" ; then
    echo
    echo "This is a new backend configuration."
    echo "  Local state .terraform/terraform.tfstate will be replaced by remote state."
    echo "  Prior state will be backed up as .terraform/terraform.tfstate.backup."
    echo 'To proceed, type "continue".'
    read should_continue
    if [ "continue" != "$should_continue" ] ; then
        echo "Aborting."
        exit 1
    fi

    mv .terraform/terraform.tfstate .terraform/terraform.tfstate.backup
fi

mv "$tmp_backend_variables_file" "$backend_variables_file"
echo "  Wrote $backend_variables_file"

# S3 bucket

echo
if ! aws s3api head-bucket --region "$region" --bucket "$bucket" ; then
    echo "Didn't find Terraform state bucket $bucket."
    echo 'To create it now, type "initialize".'

    read should_initialize
    if [ "initialize" != "$should_initialize" ] ; then
        echo "Aborting."
        exit 1
    fi

    aws s3api create-bucket --region "$region" --bucket "$bucket"
fi

echo "Using S3 bucket $bucket"
echo

# Initialize backend and modules

terraform init \
    -backend-config="region=$region" \
    -backend-config="bucket=$bucket" \
    -backend-config="key=$key"
