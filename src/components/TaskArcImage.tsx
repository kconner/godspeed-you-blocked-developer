import * as React from 'react';
import { Plan, Point } from '../types/index';
import './Canvas.css';

export interface Props {
  plan: Plan | undefined;
}

export default function ({ plan }: Props) {
  // TODO: Remove this prototype code.
  let firstTaskLocation: Point = { x: 0, y: 0 };
  if (plan) {
    const task = plan.tasks['task 1'];
    if (task) {
      firstTaskLocation = task.location;
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      // This appears to establish a relative coordinate space.
      // Let me confirm that.
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '500', height: '500', position: 'absolute', top: 0, left: 0, 'zIndex': -1 }}
    >
      <linearGradient id="gradient">
        <stop className="begin" offset="0%" />
        <stop className="end" offset="100%" />
      </linearGradient>
      <rect x={0} y={0} width={500} height={500} style={{ fill: 'url(#gradient)' }} />
      <circle cx={firstTaskLocation.x} cy={firstTaskLocation.y} r={30} style={{ fill: 'url(#gradient)' }} />
      {/*
        TODO:
        To draw a prerequisite line, I need to Move (M) to the right center of one task card
        and then make a Curve (C) with inner control points at tidy horizontal offsets and
        finally an endpoint on the left edge of the second task card.
        */}
      <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" />
    </svg>
  );
}
