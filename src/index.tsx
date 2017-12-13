import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './containers/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StoreState } from './types/index';
import { enthusiasm } from './reducers/index';

const store = createStore<StoreState>(
  enthusiasm,
  {
    languageName: 'TypeScript',
    enthusiasmLevel: 1,
  }
);

const rootReactElement = (
  <Provider store={store}>
    <Hello />
  </Provider>
);

const rootDOMElement = document.getElementById('root');
if (rootDOMElement == null) {
  throw new Error('Root DOM element not found');
}

ReactDOM.render(rootReactElement, rootDOMElement);
registerServiceWorker();
