import * as React from 'react';
import { Task, TaskStatus, Point } from '../types/index';
import TextField from './TextField';
// TODO: import './TaskCard.css';

export interface Props {
  task: Task;
  status: TaskStatus;
  setTitle: (value: string) => void;
  setAssignee: (value: string) => void;
  setLocation: (value: Point) => void;
}

export default function ({ task, status, setTitle, setAssignee, setLocation }: Props) {
  return (
    <li
      draggable={true}
      onDrag={event => setLocation({ x: event.pageX, y: event.pageY })}
    >{task.id}:
      <TextField
        label="Title"
        value={task.title}
        onChangeValue={setTitle}
      />
      <TextField
        label="Assignee"
        value={task.assignee}
        onChangeValue={setAssignee}
      />
      title: {task.title},
      assignee: {task.assignee},
      location: x: {task.location.x.toString()}, y: {task.location.y.toString()},
      done: {task.isDone.toString()},
      status: {status}
    </li>
  );
}
