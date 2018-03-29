import { DynamoDB } from 'aws-sdk'
import { stringFromAttribute, mapFromAttribute } from './attributes'

export interface State {
    id: string
    value: object
}

export const stateFromItem = (item: DynamoDB.AttributeMap): State => ({
    id: stringFromAttribute(item, 'id'),
    value: mapFromAttribute(item, 'value'),
})
