import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './components/Hello';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const rootReactElement = <Hello name="my dude" enthusiasmLevel={3} />;
const rootDOMElement = document.getElementById('root');

if (rootDOMElement == null) {
  throw new Error('Root DOM element not found');
}

ReactDOM.render(rootReactElement, rootDOMElement);
registerServiceWorker();
