import * as gateway from './api-gateway'
import * as dynamo from './dynamo-db'
import { decodeAccount } from './dynamo-db/Account'
import * as optional from './optional'

export const getAccount = gateway.asyncLambdaHandler(async (event, context) => {
    const get = async () => {
        const item = await dynamo.getItemAsync(
            gateway.requiredEnvironmentVariable(process.env, 'ACCOUNT_TABLE_NAME'),
            // TODO: Decode JWT and use the account ID embedded in it.
            '7eb9173b-41be-442a-b1ab-0cb9998d676f'
        )

        return optional.map(item, decodeAccount)
    }

    return await gateway.responseForData(get())
})
