import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

const composeEnhancers =
    (typeof window !== 'undefined' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export function createRootStore() {
    const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))
    
    return { store }

}


