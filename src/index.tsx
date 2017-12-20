import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CurrentPlanIDForm from './containers/CurrentPlanIDForm';
import CurrentPlanCanvas from './containers/CurrentPlanCanvas';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StoreState } from './types/index';
import reduce from './reducers/index';

const store = createStore<StoreState>(
  reduce,
  {
    currentPlanID: '',
    plans: {
      'sample': {
        id: 'sample',
        tasks: {
          'task 1': {
            id: 'task 1',
            title: '',
            assignee: '',
            location: {
              x: 100,
              y: 100
            },
            isDone: true,
            prerequisiteTaskIDs: []
          },
          'task 2': {
            id: 'task 2',
            title: 'Next task',
            assignee: 'me',
            location: {
              x: 400,
              y: 100
            },
            isDone: false,
            prerequisiteTaskIDs: ['task 1']
          },
          'task 3': {
            id: 'task 3',
            title: '',
            assignee: '',
            location: {
              x: 100,
              y: 300
            },
            isDone: false,
            prerequisiteTaskIDs: []
          },
          'task 4': {
            id: 'task 4',
            title: 'Next task',
            assignee: 'me',
            location: {
              x: 400,
              y: 300
            },
            isDone: false,
            prerequisiteTaskIDs: ['task 3']
          },
          'task 5': {
            id: 'task 5',
            title: 'Blocked task',
            assignee: 'you',
            location: {
              x: 700,
              y: 200
            },
            isDone: false,
            prerequisiteTaskIDs: ['task 2', 'task 4']
          }
        }
      }
    }
  }
);

const rootReactElement = (
  <Provider store={store}>
    <div>
      <CurrentPlanIDForm />
      <CurrentPlanCanvas />
    </div>
  </Provider>
);

const rootDOMElement = document.getElementById('root');
if (rootDOMElement == null) {
  throw new Error('Root DOM element not found');
}

ReactDOM.render(rootReactElement, rootDOMElement);
registerServiceWorker();
