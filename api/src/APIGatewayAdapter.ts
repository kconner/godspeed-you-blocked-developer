import * as Lambda from 'aws-lambda'
import { AWSError, DynamoDB } from 'aws-sdk'

export const tryEnvironmentVariable = (env: NodeJS.ProcessEnv, name: string): string => {
    const value = env[name]

    if (!value) {
        throw response(500, { message: `Missing environment variable ${name}` })
    }

    return value
}

export const tryPathParameter = (event: Lambda.APIGatewayProxyEvent, name: string): string => {
    const pathParameters: { [key: string]: string | undefined } = event.pathParameters || {}
    const value = pathParameters[name]

    if (!value) {
        throw response(400, { message: `Missing path parameter ${name}` })
    }

    return value
}

export const responseForGetItem = (
    error: AWSError,
    output: DynamoDB.GetItemOutput,
    mapItem: (item: DynamoDB.AttributeMap) => object
): Lambda.APIGatewayProxyResult => {
    if (error) {
        return response(500, { message: error.message, underlying: error })
    }

    const item = output.Item
    if (!item) {
        return response(404, { message: 'No such item' })
    }

    return response(200, mapItem(item))
}

const response = (statusCode: number, body: object): Lambda.APIGatewayProxyResult => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
})
