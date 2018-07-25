import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './header';
import {createStore,applyMiddleware,compose} from 'redux';
// import { middleware } from "./route/configureStore";
import reducer from './store/reducer';
import initialState from './store/reducer/appReducer'
import thunk from 'redux-thunk'

const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const store = createStore(reducer,initialState, enhancer)
ReactDOM.render(<Header store={store}/>, document.getElementById('root'));
registerServiceWorker();
