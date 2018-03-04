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
APP_STAGE=<stage> AWS_PROFILE=<profile name> ./start-container.sh
```

### Build and deploy the AWS stack

```
./run.sh shipit
```

### Build TypeScript files

```
./run.sh build
```

### Create or update an AWS stack

```
./run.sh serverless deploy
```

### Test a lambda function

```
./run.sh serverless invoke --function helloWorld
```

### Destroy an AWS stack

```
./run.sh serverless remove
```
