import * as React from 'react';
import './TaskCardSource.css';

export default class TaskCardSource extends React.Component {

  static readonly addTaskMimeType = 'application/x-add-task';

  onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setData(TaskCardSource.addTaskMimeType, '+');
  }

  render() {
    return (
      <div
        draggable={true}
        onDragStart={event => this.onDragStart(event)}
        className="taskCardSource"
      >
        Drag me!
      </div>
    );
  }

}
