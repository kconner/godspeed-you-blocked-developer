import * as React from 'react'
import { Task, TaskStatus, Point, Size } from '../types/index'
import { size as cardSize, handleCenterForConnectionIndexAndCount } from './TaskCard'
import './TaskArc.css'

export interface Props {
    source: Task
    destination: Task
    status: TaskStatus
    index: number
    count: number
}

export default ({ source, destination, status, index, count }: Props) => {
    // Draw from the right edge of the source to the left edge of the destination.
    const p0 = offsetPoint(source.location, offsetToTaskCardRightCenter)
    const offsetToTaskCardLeftSegment = { width: 0, height: handleCenterForConnectionIndexAndCount(index, count) }
    const p3 = offsetPoint(destination.location, offsetToTaskCardLeftSegment)

    // Curve the line harder depending on how far separated the endpoints are.
    const controlPointOffset = Math.max(100, Math.abs((p3.x - p0.x) * 0.5))
    const p1 = offsetPoint(p0, { width: controlPointOffset, height: 0 })
    const p2 = offsetPoint(p3, { width: -controlPointOffset, height: 0 })

    const className = ['taskArc', status].join(' ')
    const curve =
        `M ${coordinatesForPoint(p0)}` +
        `C ${coordinatesForPoint(p1)}, ${coordinatesForPoint(p2)}, ${coordinatesForPoint(p3)}`
    return <path className={className} d={curve} />
}

// Helpers

const offsetToTaskCardRightCenter = { width: cardSize.width, height: cardSize.height / 2 }

const offsetPoint = (point: Point, offset: Size): Point => ({
    x: point.x + offset.width,
    y: point.y + offset.height,
})

const coordinatesForPoint = (point: Point): string => `${point.x} ${point.y}`
