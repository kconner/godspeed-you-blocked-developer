import * as React from 'react';
import { Plan, Point, tasksInPlan, statusForTaskInPlan } from '../types/index';
import TaskCard from './TaskCard';
// TODO: import './Canvas.css';

export interface Props {
  plan: Plan | undefined;
  setTaskTitle: (taskID: string, value: string) => void;
  setTaskAssignee: (taskID: string, value: string) => void;
  setTaskLocation: (taskID: string, value: Point) => void;
}

export default function ({ plan, setTaskTitle, setTaskAssignee, setTaskLocation }: Props) {
  return (
    <div className="canvas">
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
              />
              // prerequisites: {prerequisitesForTaskInPlan(task, plan).toString()},
            )
          }
        </ul>
      }
    </div>
  );
}
