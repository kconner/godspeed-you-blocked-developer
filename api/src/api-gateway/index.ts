import * as Lambda from 'aws-lambda'
import { AWSError, DynamoDB } from 'aws-sdk'
import { drop } from '../async'

export const asyncLambdaHandler = (
    task: (event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => Promise<Lambda.APIGatewayProxyResult>
) => (event: Lambda.APIGatewayProxyEvent, context: Lambda.Context, callback: Lambda.APIGatewayProxyCallback) => {
    drop(task(event, context))(callback)
}

export const requireEnvironmentVariable = (env: NodeJS.ProcessEnv, name: string): string => {
    const value = env[name]

    if (!value) {
        throw response(500, { message: `Missing environment variable ${name}` })
    }

    return value
}

export const requirePathParameter = (event: Lambda.APIGatewayProxyEvent, name: string): string => {
    const pathParameters: { [key: string]: string | undefined } = event.pathParameters || {}
    const value = pathParameters[name]

    if (!value) {
        throw response(400, { message: `Missing path parameter ${name}` })
    }

    return value
}

export const responseForData = (data: object | null) => {
    try {
        if (data) {
            return response(200, data)
        } else {
            return response(404, { message: 'No such item' })
        }
    } catch (error) {
        return response(500, { message: error.message, underlying: error })
    }
}

const response = (statusCode: number, body: object): Lambda.APIGatewayProxyResult => ({
    statusCode,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(body),
})
