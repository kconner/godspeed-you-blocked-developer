import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { GetItemInput } from "aws-sdk/clients/dynamodb";
import * as adapter from "./adapter";

export const getState: APIGatewayProxyHandler = (event, context, callback) => {
  try {
    const input = tryMakeInput(process.env, event);
    new DynamoDB().getItem(input, (error, output) => {
      const response = adapter.makeGetItemResponse(error, output, makeState);
      callback(null, response);
    });
  } catch (errorResponse) {
    callback(null, errorResponse);
  }
};

const tryMakeInput = (env: NodeJS.ProcessEnv, event: APIGatewayProxyEvent): GetItemInput => {
  const tableName = adapter.tryRequireEnvironmentVariable(process.env, "GYBD_TABLE_STATES");
  const stateID = adapter.tryRequirePathParameter(event, "stateID");

  return {
    TableName: tableName,
    Key: {
      id: { S: stateID },
    },
  };
};

const makeState = (item: DynamoDB.AttributeMap): object => ({
  id: item.id.S || "",
  value: item.value.M || {},
});
