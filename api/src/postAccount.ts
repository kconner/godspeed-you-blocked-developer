import * as uuid from 'uuid/v4'
import * as gateway from './api-gateway'
import * as dynamo from './dynamo-db'
import { Account, encodeAccount } from './dynamo-db/Account'

export const postAccount = gateway.asyncLambdaHandler(async (event, context) => {
    const account: Account = {
        id: uuid(),
        email: 'a@b.c',
    }

    const item = encodeAccount(account)

    await dynamo.putItemAsync(gateway.requiredEnvironmentVariable(process.env, 'ACCOUNT_TABLE_NAME'), item)

    return gateway.responseForData(account)
})
