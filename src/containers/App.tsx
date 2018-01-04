import * as React from 'react';
import CurrentPlanIDForm from './CurrentPlanIDForm';
import TaskCardBin from './TaskCardBin';
import CurrentPlanCanvas from './CurrentPlanCanvas';
import './App.css';

export default () => (
  <div className="app">
    <CurrentPlanCanvas />
    <div className="appSidebar">
      <div className="appTitle">
        Critical Path
      </div>
      <div className="appGitHubLink">
        <a href="https://github.com/kconner/CriticalPath">GitHub</a>
      </div>
      <CurrentPlanIDForm />
      <TaskCardBin />
    </div>
  </div>
);
