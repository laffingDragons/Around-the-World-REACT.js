import { createStore, combineReducers, applyMiddleware , compose } from 'redux';
import { routerReducer, routerMiddleware, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../store/reducer';
// import history from './history';

// const middlewareHistory = routerMiddleware(history);

// export const rootReducer = combineReducers({
// 	...reducer,
// 	routing: routerReducer
// });

// export const middleware = applyMiddleware(
// 	createLogger(),
// 	thunk
// );

// export const store = createStore(
// 	rootReducer,
// 	middleware
// );


// ----------------------tm----------------------
const intialState = {};

const middleware  = [thunk];

const store = createStore(rootReducer, intialState,compose( applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;