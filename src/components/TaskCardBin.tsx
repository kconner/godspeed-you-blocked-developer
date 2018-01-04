import * as React from 'react';
import {
  TaskCard,
  contentSize as taskCardContentSize,
  padding as taskCardPadding
} from './TaskCard';
import './TaskCardBin.css';

interface Props {
  currentPlanID: string;
  removeTask: (taskID: string) => void;
}

export default class TaskCardBin extends React.Component<Props> {

  static readonly addTaskMimeType = 'application/x-add-task';

  onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.effectAllowed = 'copy';

    const boundingRect = event.currentTarget.getBoundingClientRect();

    const dragOffset = {
      width: event.pageX - boundingRect.left,
      height: event.pageY - boundingRect.top
    };

    const jsonString = JSON.stringify({ dragOffset });

    event.dataTransfer.setData(TaskCardBin.addTaskMimeType, jsonString);
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
    return this.props.currentPlanID.length <= 0 ? null : (
      <div
        draggable={true}
        onDragStart={event => this.onDragStart(event)}
        onDragOver={event => this.onDragOver(event)}
        onDrop={event => this.onDrop(event)}
        className="taskCardBin"
      >
        <div
          className="taskCardBinContent"
          style={{
            width: taskCardContentSize.width,
            height: taskCardContentSize.height,
            padding: `${taskCardPadding.height}px ${taskCardPadding.width}px`
          }}
        >
          🖐 Add
          <br />
          🗑 Remove
        </div>
      </div>
    );
  }

}
