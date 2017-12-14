import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GroupForm from './containers/GroupForm';
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
    group: ''
  }
);

const rootReactElement = (
  <Provider store={store}>
    <div>
      <GroupForm />
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
