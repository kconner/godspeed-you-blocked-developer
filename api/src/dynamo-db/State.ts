import { DynamoDB } from 'aws-sdk'
import { attributeOfItem, decodeString, decodeInteger, encodeString, encodeInteger } from './attributes'

export interface State {
    id: string
    value: number
}

export const decodeState = (item: DynamoDB.AttributeMap): State => ({
    id: decodeString(attributeOfItem(item, 'id')),
    value: decodeInteger(attributeOfItem(item, 'name')),
})

export const encodeState = (state: State): DynamoDB.AttributeMap => ({
    id: encodeString(state.id),
    value: encodeInteger(state.value),
})
