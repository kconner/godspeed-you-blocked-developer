import * as React from 'react';
import CurrentPlanIDForm from './CurrentPlanIDForm';
import TaskCardSource from '../components/TaskCardSource';
import TaskCardTrash from './TaskCardTrash';
import CurrentPlanCanvas from './CurrentPlanCanvas';

export default () => (
  <div>
    <CurrentPlanIDForm />
    <TaskCardSource />
    <TaskCardTrash />
    <CurrentPlanCanvas />
  </div>
);
