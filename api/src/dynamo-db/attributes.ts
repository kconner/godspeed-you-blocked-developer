import { DynamoDB } from 'aws-sdk'

export const stringFromAttribute = (item: DynamoDB.AttributeMap, name: string) => attributeFromItem(item, name).S || ''

export const integerFromAttribute = (item: DynamoDB.AttributeMap, name: string) =>
    parseInt(attributeFromItem(item, name).N || '0')

export const booleanFromAttribute = (item: DynamoDB.AttributeMap, name: string) =>
    attributeFromItem(item, name).BOOL || false

export const mapFromAttribute = (item: DynamoDB.AttributeMap, name: string) => attributeFromItem(item, name).M || {}

export const stringListFromAttribute = (item: DynamoDB.AttributeMap, name: string) =>
    (attributeFromItem(item, name).L || []).reduce(
        (list, item) => {
            const value = item.S
            if (value) {
                list.push(value)
            }
            return list
        },
        [] as string[]
    )

const attributeFromItem = (item: DynamoDB.AttributeMap, name: string): DynamoDB.AttributeValue => item[name] || {}
