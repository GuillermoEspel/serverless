# Serverless Framework Node API Rest on AWS

## Technologies

- Serverless Framework
- AWS SDK
- AWS Lambda
- AWS DynamoDB
- AWS Cognito
- AWS S3
- AWS Rekognition
- NodeJS
- Jest

## Requirements

- Configure AWS SDK credentials
- Install Java JDK (for dynamodb-local)

```
  sudo apt update
  sudo apt install default-jre
  java -version
```

## Development

- Set up a local Lambda and DynamoDB emulator server.
  This allows you to test functionality without consuming AWS services. You can test the APIs from Postman, curl, etc.

```
sls offline start
```

## Testing

- Run unit tests.

```
npm run test
```

## Deploy to AWS

```
npm run deploy
```

## Delete AWS CloudFormation project

- If you want to remove the CloudFormation project from AWS:

```
npm run remove
```

## Configure AWS Cognito

- Deploy configuration:

```
npm run deploy
```

- Enter the Cognito dashboard.
- Select the User Pool generated in the deployment.
- Select "App client settings", enable "Cognito User Pool" as provider and enter the callback and sign out URLs.
- Select "Implicit grant" from Allowed OAuth Flows.
- Select all checks for Allowed OAuth Scopes.
