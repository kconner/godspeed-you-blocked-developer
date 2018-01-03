import * as React from 'react';
import TaskCard from './TaskCard';
import './TaskCardTrash.css';

interface Props {
  removeTask: (taskID: string) => void;
}

export default class TaskCardTrash extends React.Component<Props> {

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
        onDragOver={event => this.onDragOver(event)}
        onDrop={event => this.onDrop(event)}
        className="taskCardTrash"
      >
        Drop here!
      </div>
    );
  }

}
