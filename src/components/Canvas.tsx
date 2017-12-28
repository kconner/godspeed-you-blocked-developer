import * as React from 'react';
import { Plan, Point, prerequisitesForTaskInPlan, tasksInPlan, statusForTaskInPlan } from '../types/index';
import TaskArcImage from './TaskArcImage';
import TaskCard from './TaskCard';

export interface Props {
  plan: Plan | undefined;
  setTaskTitle: (taskID: string, value: string) => void;
  setTaskAssignee: (taskID: string, value: string) => void;
  setTaskLocation: (taskID: string, value: Point) => void;
  setTaskDone: (taskID: string, value: boolean) => void;
  addPrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => void;
  removePrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => void;
}

export default class Canvas extends React.Component<Props> {

  onDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (0 <= event.dataTransfer.types.indexOf(TaskCard.modifyPrerequisiteMimeType)) {
      event.dataTransfer.dropEffect = 'move';
      event.preventDefault();
    }
  }

  onDrop(event: React.DragEvent<HTMLDivElement>) {
    if (0 <= event.dataTransfer.types.indexOf(TaskCard.modifyPrerequisiteMimeType)) {
      const jsonString = event.dataTransfer.getData(TaskCard.modifyPrerequisiteMimeType);
      const { sourceTaskID, destinationTaskID } = JSON.parse(jsonString);

      this.props.removePrerequisiteTask(sourceTaskID, destinationTaskID);
    }
  }

  render() {
    const {
      plan, setTaskTitle, setTaskAssignee, setTaskLocation, setTaskDone, addPrerequisiteTask, removePrerequisiteTask
    } = this.props;

    return (
      <div
        className="canvas"
        onDragOver={event => this.onDragOver(event)}
        onDrop={event => this.onDrop(event)}
      >
        <TaskArcImage plan={plan} />
        {
          !plan ? null : <ul>
            {
              tasksInPlan(plan).map(task =>
                <TaskCard
                  key={task.id}
                  task={task}
                  prerequisiteTasks={prerequisitesForTaskInPlan(task, plan)}
                  status={statusForTaskInPlan(task, plan)}
                  setTitle={(value: string) => setTaskTitle(task.id, value)}
                  setAssignee={(value: string) => setTaskAssignee(task.id, value)}
                  setLocation={(value: Point) => setTaskLocation(task.id, value)}
                  setDone={(value: boolean) => setTaskDone(task.id, value)}
                  addPrerequisiteTask={addPrerequisiteTask}
                  removePrerequisiteTask={removePrerequisiteTask}
                />
              )
            }
          </ul>
        }
      </div>
    );
  }

}
