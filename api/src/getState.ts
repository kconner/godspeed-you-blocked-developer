import * as gateway from './api-gateway'
import * as dynamo from './dynamo-db'
import { decodeState } from './dynamo-db/State'
import * as optional from './optional'

export const getState = gateway.asyncLambdaHandler(async (event, context) => {
    const item = await dynamo.getItemAsync(
        gateway.requiredEnvironmentVariable(process.env, 'STATE_TABLE_NAME'),
        gateway.requiredPathParameter(event, 'stateID')
    )

    const state = optional.map(item, decodeState)

    return gateway.responseForData(state)
})
