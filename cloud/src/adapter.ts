import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { AWSError, DynamoDB } from "aws-sdk";
import { GetItemOutput } from "aws-sdk/clients/dynamodb";

export const tryRequireEnvironmentVariable = (env: NodeJS.ProcessEnv, name: string): string => {
  const value = env[name];

  if (!value) {
    throw makeResponse(500, { message: `Missing environment variable ${name}` });
  }

  return value;
};

export const tryRequirePathParameter = (event: APIGatewayProxyEvent, name: string): string => {
  const pathParameters: { [key: string]: string | undefined } = event.pathParameters || {};
  const value = pathParameters[name];

  if (!value) {
    throw makeResponse(400, { message: `Missing path parameter ${name}` });
  }

  return value;
};

export const makeGetItemResponse = (
  error: AWSError,
  output: GetItemOutput,
  mapItem: (item: DynamoDB.AttributeMap) => object,
): APIGatewayProxyResult => {
  if (error) {
    return makeResponse(500, { message: error.message, underlying: error });
  }

  const item = output.Item;
  if (!item) {
    return makeResponse(404, { message: "No such item" });
  }

  return makeResponse(200, mapItem(item));
};

const makeResponse = (statusCode: number, body: object): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(body),
});
