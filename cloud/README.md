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
AWS_PROFILE=<profile name> ./start-container.sh
```

### Create or update an AWS stack

```
../node_modules/.bin/serverless deploy
```

### Destroy an AWS stack

```
../node_modules/.bin/serverless remove
```
