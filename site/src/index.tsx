import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import { createStore } from 'redux'
import { StoreState, loadState, saveState } from './types/index'
import reduce from './reducers/index'

import { Provider } from 'react-redux'
import App from './containers/App'
import './index.css'

const initialState = loadState() || {
    currentPlanID: '',
    plans: {
        sample: {
            id: 'sample',
            tasks: {
                'task 1': {
                    id: 'task 1',
                    title: 'First task',
                    assignee: 'you',
                    location: {
                        x: 100,
                        y: 100,
                    },
                    isDone: true,
                    prerequisiteTaskIDs: [],
                },
                'task 2': {
                    id: 'task 2',
                    title: 'Next task',
                    assignee: 'me',
                    location: {
                        x: 400,
                        y: 100,
                    },
                    isDone: false,
                    prerequisiteTaskIDs: ['task 1'],
                },
                'task 3': {
                    id: 'task 3',
                    title: 'Blocked task',
                    assignee: 'you',
                    location: {
                        x: 700,
                        y: 100,
                    },
                    isDone: false,
                    prerequisiteTaskIDs: ['task 2'],
                },
            },
        },
    },
}

const store = createStore<StoreState>(reduce, initialState)

store.subscribe(() => {
    saveState(store.getState())
})

const rootReactElement = (
    <Provider store={store}>
        <App />
    </Provider>
)

const rootDOMElement = document.getElementById('root')
if (rootDOMElement == null) {
    throw new Error('Root DOM element not found')
}

ReactDOM.render(rootReactElement, rootDOMElement)
registerServiceWorker()
