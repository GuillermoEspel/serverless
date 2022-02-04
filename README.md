# Serverless Framework Node API Rest on AWS

## Technologies

- Serverless Framework
- AWS SDK
- AWS Lambda
- AWS DynamoDB
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
sls deploy --verbose
```

## Delete AWS CloudFormation project

- If you want to remove the CloudFormation project from AWS:

```
sls remove
```
