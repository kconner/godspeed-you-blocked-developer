#!/bin/bash -e

rest_api_id=$( terraform output rest_api_id )
echo "Deploying stage $APP_STAGE for $rest_api_id."
aws --region "$AWS_REGION" apigateway create-deployment --rest-api-id "$rest_api_id" --stage-name "$APP_STAGE"
