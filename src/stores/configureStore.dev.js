import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import rootReducer from '../reducers';
import DevTools from './../containers/DevTools';

export default function configureStore(initialState) {
    return createStore(rootReducer, DevTools.instrument(), applyMiddleware(thunk, initialState));
}
