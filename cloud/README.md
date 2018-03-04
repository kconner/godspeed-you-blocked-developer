# Cloud provisioning

## Setup

### Docker

Install Docker as the regular Docker app from their website.

### AWS profile

Configure an AWS profile with your access key ID, secret access key, and region:

```
brew install awscli
aws configure --profile <profile name>
```

## Work in Docker

```
AWS_REGION=<region> AWS_PROFILE=<profile> APP_STAGE=<stage> ./start-container.sh
```

### Build and deploy the AWS stack

```
npm run shipit
```

### Build TypeScript files

```
npm run build
```

### Test a lambda function

```
npm run serverless -- invoke --function helloWorld
```

### Destroy an AWS stack

```
npm run serverless -- remove
```
