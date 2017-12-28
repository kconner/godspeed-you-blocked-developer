import * as React from 'react';
import {
  Plan,
  tasksInPlan,
  prerequisitesForTaskInPlan,
  prerequisitesOrderedForTask,
  statusForTaskInPlan
} from '../types/index';
import TaskArc from './TaskArc';
import './TaskArcImage.css';

export interface Props {
  plan: Plan | undefined;
}

export default ({ plan }: Props) => (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="taskArcImage">
    {
      !plan ? null : tasksInPlan(plan).map(task => {
        const prerequisiteTasks = prerequisitesForTaskInPlan(task, plan);
        const prerequisiteCount = prerequisiteTasks.length;
        const orderedPrerequisiteTasks = prerequisitesOrderedForTask(prerequisiteTasks, task);

        return orderedPrerequisiteTasks.map((prerequisite, index) =>
          <TaskArc
            key={`${prerequisite.id} -> ${task.id}`}
            source={prerequisite}
            destination={task}
            status={statusForTaskInPlan(task, plan)}
            index={index}
            count={prerequisiteCount}
          />
        );
      })
    }
  </svg>
);
