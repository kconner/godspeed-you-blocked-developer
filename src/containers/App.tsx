import * as React from 'react';
import CurrentPlanIDForm from './CurrentPlanIDForm';
import TaskCardBin from './TaskCardBin';
import CurrentPlanCanvas from './CurrentPlanCanvas';

export default () => (
  <div>
    <div style={{ position: 'absolute', display: 'block', top: 20, left: 20 }}>
      <CurrentPlanIDForm />
    </div>
    <TaskCardBin />
    <CurrentPlanCanvas />
  </div>
);
