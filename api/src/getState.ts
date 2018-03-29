import * as gateway from './api-gateway'
import * as dynamo from './dynamo-db'
import { stateFromItem } from './dynamo-db/State'
import * as optional from './optional'

export const getState = gateway.asyncLambdaHandler(async (event, context) => {
    const item = await dynamo.getItemAsync(
        gateway.requireEnvironmentVariable(process.env, 'GYBD_TABLE_STATES'),
        gateway.requirePathParameter(event, 'stateID')
    )

    const state = optional.map(item, stateFromItem)

    return gateway.responseForData(state)
})
