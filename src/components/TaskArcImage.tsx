import * as React from 'react';
import { Plan, Size, tasksInPlan, prerequisitesForTaskInPlan } from '../types/index';
import TaskArc from './TaskArc';

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
    style={{ width: size.width, height: size.height, position: 'absolute', top: 0, left: 0, 'zIndex': -1 }}
  >
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
