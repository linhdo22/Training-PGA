import { createStore, applyMiddleware, compose, Reducer } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import rootReducer from './reducers'

const persistConfig = {
    key: 'persist',
    storage: storage,
    whitelist: ['auth']
}

const composeEnhancers =
    (typeof window !== 'undefined' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;



export function createRootStore(preloadState: any) {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = createStore(persistedReducer, preloadState, composeEnhancers(applyMiddleware(thunk)))
    const persistor = persistStore(store)

    return { store, persistor }

}


