import * as React from 'react';
import { Plan, tasksInPlan, prerequisitesForTaskInPlan, statusForTaskInPlan } from '../types/index';
// TODO: import './Canvas.css';

export interface Props {
  plan: Plan | undefined;
}

export default function ({ plan }: Props) {
  return (
    <div className="canvas">
      {
        !plan ? null : <ul>
          {
            tasksInPlan(plan).map(task =>
              <li key={task.id}>{task.id}:
              title: {task.title},
              assignee: {task.assignee},
              location: x: {task.location.x.toString()}, y: {task.location.y.toString()},
              done: {task.isDone.toString()},
              prerequisites: {prerequisitesForTaskInPlan(task, plan).toString()},
              status: {statusForTaskInPlan(task, plan)}
              </li>
            )
          }
        </ul>
      }
    </div>
  );
}
