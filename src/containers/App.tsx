import * as React from 'react';
import CurrentPlanIDForm from './CurrentPlanIDForm';
import TaskCardSource from '../components/TaskCardSource';
import CurrentPlanCanvas from './CurrentPlanCanvas';

export default () => (
  <div>
    <CurrentPlanIDForm />
    <TaskCardSource />
    <CurrentPlanCanvas />
  </div>
);
