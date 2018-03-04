import { ProxyHandler, ProxyResult } from "aws-lambda";

export const helloWorld: ProxyHandler = (event, context, callback) => {
  callback(
    null,
    result(200, {
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event,
    }),
  );
};

const result = (statusCode: number, json: any): ProxyResult => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  body: JSON.stringify(json),
});
