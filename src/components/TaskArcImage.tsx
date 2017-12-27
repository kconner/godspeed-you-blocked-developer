import * as React from 'react';
import { Plan, tasksInPlan, prerequisitesForTaskInPlan } from '../types/index';
import TaskArc from './TaskArc';
import './TaskArcImage.css';

export interface Props {
  plan: Plan | undefined;
}

export default ({ plan }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="taskArcImage">
    {
      !plan ? null : tasksInPlan(plan).map(task =>
        prerequisitesForTaskInPlan(task, plan)
          .map(prerequisite =>
            <TaskArc
              key={`${prerequisite.id} -> ${task.id}`}
              source={prerequisite}
              destination={task}
              plan={plan}
            />
          )
      )
    }
  </svg>
);
