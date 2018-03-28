import * as Lambda from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import * as gateway from './APIGatewayAdapter'
import * as dynamo from './DynamoDBAdapter'

export const getState: Lambda.APIGatewayProxyHandler = (event, context, callback) => {
    try {
        const input = tryInputFromRequest(process.env, event)
        new DynamoDB().getItem(input, (error, output) => {
            const response = gateway.responseForGetItem(error, output, stateFromItem)
            callback(null, response)
        })
    } catch (errorResponse) {
        callback(null, errorResponse)
    }
}

const tryInputFromRequest = (env: NodeJS.ProcessEnv, event: Lambda.APIGatewayProxyEvent): DynamoDB.GetItemInput =>
    dynamo.inputForGetItem(
        gateway.tryEnvironmentVariable(process.env, 'GYBD_TABLE_STATES'),
        gateway.tryPathParameter(event, 'stateID')
    )

const stateFromItem = (item: DynamoDB.AttributeMap): object => ({
    id: dynamo.stringFromAttribute(item, 'id'),
    value: dynamo.mapFromAttribute(item, 'value'),
})
