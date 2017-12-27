import * as React from 'react';
import { Plan, Point, tasksInPlan, statusForTaskInPlan } from '../types/index';
import TaskArcImage from './TaskArcImage';
import TaskCard from './TaskCard';

export interface Props {
  plan: Plan | undefined;
  setTaskTitle: (taskID: string, value: string) => void;
  setTaskAssignee: (taskID: string, value: string) => void;
  setTaskLocation: (taskID: string, value: Point) => void;
  setTaskDone: (taskID: string, value: boolean) => void;
  addPrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => void;
}

export default ({ plan, setTaskTitle, setTaskAssignee, setTaskLocation, setTaskDone, addPrerequisiteTask }: Props) => (
  <div className="canvas">
    <TaskArcImage plan={plan} />
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
              addPrerequisiteTask={addPrerequisiteTask}
            />
          )
        }
      </ul>
    }
  </div>
);
