import * as React from 'react';
import { Plan, Task, Point, Size, statusForTaskInPlan } from '../types/index';
import * as TaskCard from './TaskCard';
import './TaskArc.css';

export interface Props {
  source: Task;
  destination: Task;
  plan: Plan;
}

export default ({ source, destination, plan }: Props) => {
  // Draw from the right edge of the source to the left edge of the destination.
  const p0 = offsetPoint(source.location, offsetToTaskCardRightCenter);
  const p3 = offsetPoint(destination.location, offsetToTaskCardLeftCenter);

  // Curve the line harder depending on how far separated the endpoints are.
  const controlPointOffset = Math.max(100, Math.abs((p3.x - p0.x) * 0.5));
  const p1 = offsetPoint(p0, { width: controlPointOffset, height: 0 });
  const p2 = offsetPoint(p3, { width: -controlPointOffset, height: 0 });

  const className = ['taskArc', statusForTaskInPlan(source, plan)].join(' ');
  const curve = `M ${coordinatesForPoint(p0)}`
    + `C ${coordinatesForPoint(p1)}, ${coordinatesForPoint(p2)}, ${coordinatesForPoint(p3)}`;
  return <path className={className} d={curve} />;
};

// Helpers

const offsetToTaskCardRightCenter = { width: TaskCard.size.width, height: TaskCard.size.height * 0.5 };
const offsetToTaskCardLeftCenter = { width: 0, height: offsetToTaskCardRightCenter.height };

const offsetPoint = (point: Point, offset: Size): Point => ({
  x: point.x + offset.width,
  y: point.y + offset.height
});

const coordinatesForPoint = (point: Point): string =>
  `${point.x} ${point.y}`;
