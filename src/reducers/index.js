import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers } from './../redux-utils';

const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer
});
export default rootReducer;
