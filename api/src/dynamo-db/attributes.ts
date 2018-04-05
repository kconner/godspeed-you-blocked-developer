import { DynamoDB } from 'aws-sdk'

type AttributeDecoder<T> = (attribute: DynamoDB.AttributeValue) => T
type AttributeEncoder<T> = (value: T) => DynamoDB.AttributeValue

export const attributeOfItem = (item: DynamoDB.AttributeMap, name: string): DynamoDB.AttributeValue => item[name] || {}

export const decodeString = (attribute: DynamoDB.AttributeValue) => attribute.S || ''
export const encodeString = (value: string): DynamoDB.AttributeValue => ({ S: value })

export const decodeInteger = (attribute: DynamoDB.AttributeValue) => parseInt(attribute.N || '0')
export const encodeInteger = (value: number): DynamoDB.AttributeValue => ({ N: value.toString() })

export const decodeBoolean = (attribute: DynamoDB.AttributeValue) => attribute.BOOL || false
export const encodeBoolean = (value: boolean): DynamoDB.AttributeValue => ({ BOOL: value })

export const decodeList = <T>(attribute: DynamoDB.AttributeValue, mapElement: AttributeDecoder<T>) =>
    (attribute.L || []).map(mapElement)
export const encodeList = <T>(value: T[], mapElement: AttributeEncoder<T>): DynamoDB.AttributeValue => ({
    L: value.map(mapElement),
})
