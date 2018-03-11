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
AWS_REGION=<region> AWS_PROFILE=<profile> ./run-api-container.sh
```

### Build TypeScript files

```
npm run build
```

### Build, package, and upload an artifact

```
npm run shipit
```
