// import * as uuid from 'uuid/v4'
import * as gateway from './api-gateway'
// import * as dynamo from './dynamo-db'
import * as cognito from './cognito'
import { Account, encodeAccount } from './dynamo-db/Account'

export const postAccount = gateway.asyncLambdaHandler(async (event, context) => {
    const userPoolID = gateway.requiredEnvironmentVariable(process.env, 'USER_POOL_ID')
    const userPoolClientID = gateway.requiredEnvironmentVariable(process.env, 'USER_POOL_CLIENT_ID')
    const username = 'abc123' // TODO
    // const password = gateway.requiredQueryParameter(event, 'password')

    const user = await cognito.adminCreateUserAsync(userPoolID, userPoolClientID, username)

    return gateway.responseForData(user)

    // const account: Account = {
    //     id: uuid(),
    //     email: 'a@b.c',
    // }

    // const item = encodeAccount(account)

    // await dynamo.putItemAsync(gateway.requiredEnvironmentVariable(process.env, 'ACCOUNT_TABLE_NAME'), item)

    // return gateway.responseForData(account)
})
