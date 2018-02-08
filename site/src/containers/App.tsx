import * as React from 'react';
import CurrentPlanCanvas from './CurrentPlanCanvas';
import CurrentPlanIDForm from './CurrentPlanIDForm';
import NonemptyPlanIDsSelect from './NonemptyPlanIDsSelect';
import TaskCardBin from './TaskCardBin';
import './App.css';

export default () => (
  <div className="app">
    <CurrentPlanCanvas />
    <div className="appSidebar">
      <h1 className="appTitle">
        Godspeed You! Blocked Developer
      </h1>
      <div className="appGitHubLink">
        <a href="https://github.com/kconner/godspeed-you-blocked-developer">GitHub</a>
      </div>
      <NonemptyPlanIDsSelect />
      <CurrentPlanIDForm />
      <TaskCardBin />
    </div>
  </div>
);
