import * as React from 'react';
import { Plan, Point, Size, tasksInPlan, prerequisitesForTaskInPlan, statusForTaskInPlan } from '../types/index';
import * as TaskCard from './TaskCard';
import './TaskArcImage.css';

export interface Props {
  plan: Plan | undefined;
}

const size: Size = {
  width: 1600,
  height: 900
};

export default ({ plan }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    // This appears to establish a relative coordinate space.
    // Let me confirm that.
    viewBox={`0 0 ${size.width} ${size.height}`}
    preserveAspectRatio="xMidYMid slice"
    style={{ width: size.width, height: size.height, position: 'absolute', top: 0, left: 0, 'zIndex': -1 }}
  >
    {
      !plan ? null : tasksInPlan(plan).map(task =>
        prerequisitesForTaskInPlan(task, plan).map(prerequisite => {
          const key = `${prerequisite.id} -> ${task.id}`;
          const className = ['taskArc', statusForTaskInPlan(prerequisite, plan)].join(' ');

          const offsetToRightCenter = { width: TaskCard.size.width, height: TaskCard.size.height * 0.5 };
          const offsetToLeftCenter = { width: 0, height: offsetToRightCenter.height };

          // Draw from the right edge of the prerequisite to the left edge of the following task.
          const p0 = offsetPoint(prerequisite.location, offsetToRightCenter);
          const p3 = offsetPoint(task.location, offsetToLeftCenter);

          // Curve the line harder depending on how far separated the endpoints are
          const controlPointOffset = Math.max(100, Math.abs((p3.x - p0.x) * 0.5));
          const p1 = offsetPoint(p0, { width: controlPointOffset, height: 0 });
          const p2 = offsetPoint(p3, { width: -controlPointOffset, height: 0 });

          const curve = `M ${coordinatesForPoint(p0)}`
            + `C ${coordinatesForPoint(p1)}, ${coordinatesForPoint(p2)}, ${coordinatesForPoint(p3)}`;
          return <path key={key} className={className} d={curve} />;
        })
      )
    }
  </svg>
);

// Helpers

const offsetPoint = (point: Point, offset: Size): Point => ({
  x: point.x + offset.width,
  y: point.y + offset.height
});

const coordinatesForPoint = (point: Point): string =>
  `${point.x} ${point.y}`;
