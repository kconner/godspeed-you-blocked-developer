import { DynamoDB } from "aws-sdk";

export const inputForGetItem = (tableName: string, id: string): DynamoDB.GetItemInput => ({
  TableName: tableName,
  Key: {
    id: { S: id },
  },
});

export const stringFromAttribute = (item: DynamoDB.AttributeMap, name: string): string =>
  attributeFromItem(item, name).S || "";

export const mapFromAttribute = (item: DynamoDB.AttributeMap, name: string): DynamoDB.MapAttributeValue =>
  attributeFromItem(item, name).M || {};

const attributeFromItem = (item: DynamoDB.AttributeMap, name: string): DynamoDB.AttributeValue =>
  item[name] || {};
