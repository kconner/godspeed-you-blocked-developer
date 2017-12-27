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

  constructor(props: Props) {
    super(props);

    this.state = {
      dragOffset: { width: 0, height: 0 }
    };
  }

  onDragStart(event: React.DragEvent<HTMLDivElement>, taskLocation: Point) {
    this.setState({
      dragOffset: {
        width: event.pageX - taskLocation.x,
        height: event.pageY - taskLocation.y
      }
    });
  }

  onDrag(event: React.DragEvent<HTMLDivElement>, dragOffset: Size) {
    this.props.setLocation({
      x: event.pageX - dragOffset.width,
      y: event.pageY - dragOffset.height
    });
  }

  render() {
    const { task, status, setTitle, setAssignee, setDone } = this.props;
    const { location: taskLocation } = task;
    const { dragOffset } = this.state;

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
          onDragStart={event => this.onDragStart(event, taskLocation)}
          onDrag={event => this.onDrag(event, dragOffset)}
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
          onDrag={event => { window.console.log(event); event.preventDefault(); }}
        />
      </li>
    );
  }

}
