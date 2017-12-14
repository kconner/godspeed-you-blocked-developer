import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GroupForm from './containers/GroupForm';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StoreState } from './types/index';
import reduce from './reducers/index';

const store = createStore<StoreState>(
  reduce,
  {
    group: '',

    // TODO: Remove leftovers from tutorial
    languageName: 'TypeScript',
    enthusiasmLevel: 1,
  }
);

const rootReactElement = (
  <Provider store={store}>
    <GroupForm />
  </Provider>
);

const rootDOMElement = document.getElementById('root');
if (rootDOMElement == null) {
  throw new Error('Root DOM element not found');
}

ReactDOM.render(rootReactElement, rootDOMElement);
registerServiceWorker();
