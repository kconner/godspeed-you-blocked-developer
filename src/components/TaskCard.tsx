import * as React from 'react';
import { Task, TaskStatus, Point, Size } from '../types/index';
import TextField from './TextField';
import Checkbox from './Checkbox';
import './TaskCard.css';

export interface Props {
  task: Task;
  prerequisiteTasks: Task[];
  status: TaskStatus;
  setTitle: (value: string) => void;
  setAssignee: (value: string) => void;
  setLocation: (value: Point) => void;
  setDone: (value: boolean) => void;
  addPrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => void;
  removePrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => void;
}

export interface State {
  dragOffset: Size;
}

const contentSize: Size = {
  width: 200,
  height: 114
};

const padding: Size = {
  width: 8,
  height: 6
};

export const size: Size = {
  width: contentSize.width + padding.width + padding.width,
  height: contentSize.height + padding.height + padding.height
};

export default class TaskCard extends React.Component<Props, State> {

  static readonly modifyPrerequisiteMimeType = 'application/x-modify-prerequisite';
  static readonly addPrerequisiteMimeType = 'application/x-add-prerequisite';

  constructor(props: Props) {
    super(props);

    this.state = {
      dragOffset: { width: 0, height: 0 }
    };
  }

  card_onDragStart(event: React.DragEvent<HTMLDivElement>) {
    event.dataTransfer.effectAllowed = 'none';

    const taskLocation = this.props.task.location;

    this.setState({
      dragOffset: {
        width: event.pageX - taskLocation.x,
        height: event.pageY - taskLocation.y
      }
    });
  }

  card_onDrag(event: React.DragEvent<HTMLDivElement>) {
    this.props.setLocation({
      x: event.pageX - this.state.dragOffset.width,
      y: event.pageY - this.state.dragOffset.height
    });
  }

  leftHandle_onDragStart(event: React.DragEvent<HTMLDivElement>, sourceTaskID: string) {
    const destinationTaskID = this.props.task.id;
    event.dataTransfer.effectAllowed = 'linkMove';

    const jsonString = JSON.stringify({ sourceTaskID, destinationTaskID });
    event.dataTransfer.setData(TaskCard.modifyPrerequisiteMimeType, jsonString);
  }

  rightHandle_onDragStart(event: React.DragEvent<HTMLDivElement>) {
    const sourceTaskID = this.props.task.id;
    event.dataTransfer.effectAllowed = 'link';

    event.dataTransfer.setData(TaskCard.addPrerequisiteMimeType, sourceTaskID);
  }

  card_onDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (0 <= event.dataTransfer.types.indexOf(TaskCard.modifyPrerequisiteMimeType)
      || 0 <= event.dataTransfer.types.indexOf(TaskCard.addPrerequisiteMimeType)
    ) {
      event.dataTransfer.dropEffect = 'link';
      event.preventDefault();
    }
  }

  card_onDrop(event: React.DragEvent<HTMLDivElement>) {
    if (0 <= event.dataTransfer.types.indexOf(TaskCard.modifyPrerequisiteMimeType)) {
      const jsonString = event.dataTransfer.getData(TaskCard.modifyPrerequisiteMimeType);
      const { sourceTaskID, destinationTaskID } = JSON.parse(jsonString);
      const newDestinationTaskID = this.props.task.id;

      this.props.removePrerequisiteTask(sourceTaskID, destinationTaskID);
      this.props.addPrerequisiteTask(sourceTaskID, newDestinationTaskID);
    } else if (0 <= event.dataTransfer.types.indexOf(TaskCard.addPrerequisiteMimeType)) {
      const sourceTaskID = event.dataTransfer.getData(TaskCard.addPrerequisiteMimeType);
      const destinationTaskID = this.props.task.id;

      this.props.addPrerequisiteTask(sourceTaskID, destinationTaskID);
    }
  }

  render() {
    const { task, prerequisiteTasks, status, setTitle, setAssignee, setDone } = this.props;

    return (
      <li
        className="taskCard"
        style={{
          left: task.location.x,
          top: task.location.y,
        }}
      >
        <div
          draggable={true}
          onDragStart={event => this.card_onDragStart(event)}
          onDrag={event => this.card_onDrag(event)}
          onDragOver={event => this.card_onDragOver(event)}
          onDrop={event => this.card_onDrop(event)}
          className={['taskCardContent', status].join(' ')}
          style={{
            width: contentSize.width,
            height: contentSize.height,
            padding: `${padding.height}px ${padding.width}px`
          }}
        >
          <Checkbox
            id={task.id + '-isDone'}
            label={status}
            checked={task.isDone}
            enabled={status !== TaskStatus.blocked}
            onChangeChecked={setDone}
          />
          <TextField
            placeholder="title"
            value={task.title}
            onChangeValue={setTitle}
          />
          <TextField
            placeholder="assignee"
            value={task.assignee}
            onChangeValue={setAssignee}
          />
        </div>
        {
          prerequisiteTasks.map(prerequisiteTask =>
            <div
              key={prerequisiteTask.id}
              className={['taskCardHandle', status].join(' ')}
              style={{
                // TODO: Order prerequisites by location.y, and space them out.
                top: size.height / 2 - 12,
                left: -18,
              }}
              draggable={true}
              onDragStart={event => this.leftHandle_onDragStart(event, prerequisiteTask.id)}
            />
          )
        }
        <div
          className={['taskCardHandle', status].join(' ')}
          style={{
            top: size.height / 2 - 12,
            left: size.width - 12,
          }}
          draggable={true}
          onDragStart={event => this.rightHandle_onDragStart(event)}
        />
      </li>
    );
  }

}
