import * as React from 'react';
import { Task, TaskStatus } from '../types/index';
import TextField from './TextField';
// TODO: import './TaskCard.css';

export interface Props {
  task: Task;
  status: TaskStatus;
  onChangeTitle: (value: string) => void;
}

export default function ({ task, status, onChangeTitle }: Props) {
  return (
    <li>{task.id}:
      <TextField
        label="Title"
        value={task.title}
        onChangeValue={onChangeTitle}
      />
      title: {task.title},
      assignee: {task.assignee},
      location: x: {task.location.x.toString()}, y: {task.location.y.toString()},
      done: {task.isDone.toString()},
      status: {status}
    </li>
  );
}
