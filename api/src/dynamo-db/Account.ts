import { DynamoDB } from 'aws-sdk'
import { decodeString, encodeString, attributeOfItem } from './attributes'

export interface Account {
    id: string
    email: string
}

export const decodeAccount = (item: DynamoDB.AttributeMap): Account => ({
    id: decodeString(attributeOfItem(item, 'id')),
    email: decodeString(attributeOfItem(item, 'email')),
})

export const encodeAccount = (account: Account): DynamoDB.AttributeMap => ({
    id: encodeString(account.id),
    email: encodeString(account.email),
})
