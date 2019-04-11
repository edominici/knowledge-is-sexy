import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunkMiddleware from 'redux-thunk';
import { rootReducer } from './shared/redux/';
import { initialize } from './shared/redux/auth'
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;
const store = createStore(
  rootReducer, 
  composeEnhancers(
    applyMiddleware(ReduxThunkMiddleware)
  )
);
// initialize store
store.dispatch(initialize() as any)

import App from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
