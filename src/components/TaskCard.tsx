import * as React from 'react';
import { Task, TaskStatus, Point } from '../types/index';
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

export default function ({ task, status, setTitle, setAssignee, setLocation, setDone }: Props) {
  return (
    <li
      draggable={true}
      onDrag={event => setLocation({ x: event.pageX, y: event.pageY })}
      className={['taskCard', status].join(' ')}
      style={{ left: task.location.x, top: task.location.y }}
    >
      <Checkbox
        checked={task.isDone}
        enabled={status !== TaskStatus.blocked}
        onChangeChecked={setDone}
      /> {status}:
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
    </li>
  );
}
