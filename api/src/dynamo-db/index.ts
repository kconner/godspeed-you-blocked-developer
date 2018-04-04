import { DynamoDB } from 'aws-sdk'
import * as async from '../async'

const dynamo = new DynamoDB()

export const getItemAsync = async (tableName: string, id: string) => {
    const input: DynamoDB.GetItemInput = {
        TableName: tableName,
        Key: {
            id: { S: id },
        },
    }

    const output = await async.lift<DynamoDB.GetItemOutput>(callback => dynamo.getItem(input, callback))

    return output.Item || null
}

export const scanAsync = async (tableName: string) => {
    const input: DynamoDB.ScanInput = {
        TableName: tableName,
    }

    const output = await async.lift<DynamoDB.ScanOutput>(callback => dynamo.scan(input, callback))

    return output.Items || []
}

export const queryAsync = async (
    tableName: string,
    indexName: string,
    partitionKeyName: string,
    partitionKeyValue: string,
    filterKeyName?: string,
    filterKeyValue?: string,
    filterInclusive: boolean = false
) => {
    let filterExpression: string | undefined = undefined
    const expressionAttributeNames: DynamoDB.ExpressionAttributeNameMap = {
        [`#${partitionKeyName}`]: partitionKeyName,
    }
    const expressionAttributeValues: DynamoDB.ExpressionAttributeValueMap = {
        [`:${partitionKeyName}`]: { S: partitionKeyValue },
    }

    if (filterKeyName && filterKeyValue) {
        const operator = filterInclusive ? '=' : '<>'
        filterExpression = `#${filterKeyName} ${operator} :${filterKeyName}`
        expressionAttributeNames[`#${filterKeyName}`] = filterKeyName
        expressionAttributeValues[`:${filterKeyName}`] = { S: filterKeyValue }
    }

    const input: DynamoDB.QueryInput = {
        TableName: tableName,
        IndexName: indexName,
        KeyConditionExpression: `#${partitionKeyName} = :${partitionKeyName}`,
        FilterExpression: filterExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
    }

    const output = await async.lift<DynamoDB.QueryOutput>(callback => dynamo.query(input, callback))

    return output.Items || []
}
