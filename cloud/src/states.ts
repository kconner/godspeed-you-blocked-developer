import { ProxyHandler, ProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { GetItemInput } from "aws-sdk/clients/dynamodb";

const statesTable = process.env.GYBD_TABLE_STATES || "missing-environment-variable";

export const getState: ProxyHandler = (event, context, callback) => {
  const pathParameters: { [key: string]: string | undefined } = event.pathParameters || {};
  const stateID = pathParameters.stateID;

  if (!stateID) {
    callback(null, makeResponse(400, { message: "Missing stateID" }));
    return;
  }

  const input: GetItemInput = {
    TableName: statesTable,
    Key: {
      id: { S: stateID },
    },
  };

  new DynamoDB().getItem(input, (error, output) => {
    if (error) {
      callback(null, makeResponse(500, error));
      return;
    }

    const item = output.Item;
    if (!item) {
      callback(null, makeResponse(404, { message: "No such state" }));
      return;
    }

    const body = {
      id: item.id.S || "",
      value: item.value.M || {},
    };
    callback(null, makeResponse(200, body));
  });
};

const makeResponse = (statusCode: number, body: object): ProxyResult => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(body),
});
