import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CurrentPlanIDForm from './containers/CurrentPlanIDForm';
import CurrentPlanCanvas from './containers/CurrentPlanCanvas';
import StateDisplay from './containers/StateDisplay';
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
            title: 'First task',
            assignee: '',
            location: {
              x: 0,
              y: 0
            },
            isDone: false,
            prerequisiteTaskIDs: []
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
      <StateDisplay />
    </div>
  </Provider>
);

const rootDOMElement = document.getElementById('root');
if (rootDOMElement == null) {
  throw new Error('Root DOM element not found');
}

ReactDOM.render(rootReactElement, rootDOMElement);
registerServiceWorker();
