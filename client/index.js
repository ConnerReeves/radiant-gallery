import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

require('./app.scss');

const createThunkStore = applyMiddleware(thunk)(createStore);
const store =  createThunkStore(reducers);

render((
  <Provider store={ store }>
    <App />
  </Provider>
), document.getElementById('react-target'));
