import * as React from 'react';
import { Task, TaskStatus, Point, Size } from '../types/index';
import TextField from './TextField';
import Checkbox from './Checkbox';
import './TaskCard.css';

export interface Props {
  task: Task;
  status: TaskStatus;
  setTitle: (value: string) => void;
  setAssignee: (value: string) => void;
  setLocation: (value: Point) => void;
  setDone: (value: boolean) => void;
  addPrerequisiteTask: (prerequisiteTaskID: string, taskID: string) => void;
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
const addPrerequisiteMimeType = 'application/x-add-prerequisite';

export const size: Size = {
  width: contentSize.width + padding.width + padding.width,
  height: contentSize.height + padding.height + padding.height
};

export default class TaskCard extends React.Component<Props, State> {

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

  handle_onDragStart(event: React.DragEvent<HTMLDivElement>) {
    const sourceTaskID = this.props.task.id;
    event.dataTransfer.effectAllowed = 'link';
    event.dataTransfer.setData(addPrerequisiteMimeType, sourceTaskID);
  }

  card_onDragOver(event: React.DragEvent<HTMLDivElement>) {
    if (event.dataTransfer.types.indexOf(addPrerequisiteMimeType) < 0) {
      return;
    }

    event.dataTransfer.dropEffect = 'link';
    event.preventDefault();
  }

  card_onDrop(event: React.DragEvent<HTMLDivElement>) {
    if (event.dataTransfer.types.indexOf(addPrerequisiteMimeType) < 0) {
      return;
    }

    const sourceTaskID = event.dataTransfer.getData(addPrerequisiteMimeType);
    const destinationTaskID = this.props.task.id;
    if (sourceTaskID === destinationTaskID) {
      return;
    }

    this.props.addPrerequisiteTask(sourceTaskID, destinationTaskID);
  }

  render() {
    const { task, status, setTitle, setAssignee, setDone } = this.props;

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
        <div
          className={['taskCardHandle', status].join(' ')}
          style={{
            top: size.height / 2 - 12,
            left: size.width - 12,
          }}
          draggable={true}
          onDragStart={event => this.handle_onDragStart(event)}
        />
      </li>
    );
  }

}
