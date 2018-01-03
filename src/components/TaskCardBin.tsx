import * as React from 'react';
import { TaskCard, padding as taskCardPadding } from './TaskCard';
import './TaskCardBin.css';

interface Props {
  removeTask: (taskID: string) => void;
}

export default class TaskCardBin extends React.Component<Props> {

  static readonly addTaskMimeType = 'application/x-add-task';

  onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData(TaskCardBin.addTaskMimeType, '+');
  }

  onDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (0 <= event.dataTransfer.types.indexOf(TaskCard.modifyTaskMimeType)) {
      event.dataTransfer.dropEffect = 'move';
      event.preventDefault();
    }
  }

  onDrop(event: React.DragEvent<HTMLDivElement>) {
    if (0 <= event.dataTransfer.types.indexOf(TaskCard.modifyTaskMimeType)) {
      const jsonString = event.dataTransfer.getData(TaskCard.modifyTaskMimeType);
      const { taskID } = JSON.parse(jsonString);

      this.props.removeTask(taskID);
    }
  }

  render() {
    return (
      <div
        draggable={true}
        onDragStart={event => this.onDragStart(event)}
        onDragOver={event => this.onDragOver(event)}
        onDrop={event => this.onDrop(event)}
        className="taskCardBin"
      >
        <div
          className="taskCardContent"
          style={{
            padding: `${taskCardPadding.height}px ${taskCardPadding.width}px`
          }}
        >
          Tasks
        </div>
      </div>
    );
  }

}
