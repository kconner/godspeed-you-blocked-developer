import { DynamoDB } from 'aws-sdk'
import { lift } from '../async'

const dynamo = new DynamoDB()

export const getItemAsync = async (tableName: string, id: string) => {
    const input: DynamoDB.GetItemInput = {
        TableName: tableName,
        Key: {
            id: { S: id },
        },
    }

    const output = await lift<DynamoDB.GetItemOutput>(callback => dynamo.getItem(input, callback))

    return output.Item || null
}
