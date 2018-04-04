import * as Lambda from 'aws-lambda'
import * as async from '../async'

export const asyncLambdaHandler = (
    task: (event: Lambda.APIGatewayProxyEvent, context: Lambda.Context) => Promise<Lambda.APIGatewayProxyResult>
) => (event: Lambda.APIGatewayProxyEvent, context: Lambda.Context, callback: Lambda.APIGatewayProxyCallback) => {
    async.drop(task(event, context))(callback)
}

export const requiredEnvironmentVariable = (env: NodeJS.ProcessEnv, name: string) => {
    const value = optionalEnvironmentVariable(env, name)

    if (!value) {
        throw response(500, { message: `Missing environment variable ${name}` })
    }

    return value
}

export const optionalEnvironmentVariable = (env: NodeJS.ProcessEnv, name: string) => {
    return env[name] || null
}

export const requiredPathParameter = (event: Lambda.APIGatewayProxyEvent, name: string) => {
    const pathParameters: { [key: string]: string | undefined } = event.pathParameters || {}
    const value = pathParameters[name]

    if (!value) {
        throw response(400, { message: `Missing path parameter ${name}` })
    }

    return value
}

export const requiredQueryParameter = (event: Lambda.APIGatewayProxyEvent, name: string) => {
    const value = optionalQueryParameter(event, name)

    if (!value) {
        throw response(400, { message: `Missing query parameter ${name}` })
    }

    return value
}

export const optionalQueryParameter = (event: Lambda.APIGatewayProxyEvent, name: string) => {
    const queryParameters: { [key: string]: string | undefined } = event.queryStringParameters || {}
    return queryParameters[name] || null
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
