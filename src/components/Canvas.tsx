import * as React from 'react';
import { Plan, Point, tasksInPlan, statusForTaskInPlan } from '../types/index';
import TaskCard from './TaskCard';
import './Canvas.css';

export interface Props {
  plan: Plan | undefined;
  setTaskTitle: (taskID: string, value: string) => void;
  setTaskAssignee: (taskID: string, value: string) => void;
  setTaskLocation: (taskID: string, value: Point) => void;
  setTaskDone: (taskID: string, value: boolean) => void;
}

export default function ({ plan, setTaskTitle, setTaskAssignee, setTaskLocation, setTaskDone }: Props) {
  let firstTaskLocation: Point = { x: 0, y: 0 };
  if (plan) {
    const task = plan.tasks['task 1'];
    if (task) {
      firstTaskLocation = task.location;
    }
  }

  return (
    <div className="canvas">
      {/*
      The idea is to create an SVG canvas behind the rest of the board,
      and fill it with whatever interesting shapes we need to
      in order to represent all the relationships between tasks.

      For now, I'll hijack the first task.
      The first task's X, Y should establish the center of the circle, say.
      If I can get that to update live, we're in business.

      Yes, it works! And it works fast enough.
      Now how do I draw a bezier curve arrow?
      https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
       */}
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
        <rect x={0} y={0} width={500} height={500} style={{ fill: 'url(#gradient)'}} />
        <circle cx={firstTaskLocation.x} cy={firstTaskLocation.y} r={30} style={{ fill: 'url(#gradient)'}} />
        {/*
        TODO:
        To draw a prerequisite line, I need to Move (M) to the right center of one task card
        and then make a Curve (C) with inner control points at tidy horizontal offsets and finally an endpoint on the left edge of the second task card.
        */}
        <path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" />
      </svg>

      {
        !plan ? null : <ul>
          {
            tasksInPlan(plan).map(task =>
              <TaskCard
                key={task.id}
                task={task}
                status={statusForTaskInPlan(task, plan)}
                setTitle={(value: string) => setTaskTitle(task.id, value)}
                setAssignee={(value: string) => setTaskAssignee(task.id, value)}
                setLocation={(value: Point) => setTaskLocation(task.id, value)}
                setDone={(value: boolean) => setTaskDone(task.id, value)}
              />
              // prerequisites: {prerequisitesForTaskInPlan(task, plan).toString()},
            )
          }
        </ul>
      }
    </div>
  );
}
