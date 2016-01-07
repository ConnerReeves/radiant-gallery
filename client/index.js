import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import thunk from 'redux-thunk';

import AppContainer from './containers/AppContainer';
import reducers from './reducers';

const createThunkStore = applyMiddleware(thunk)(createStore);
const store =  createThunkStore(reducers);

render((
  <Provider store={ store }>
    <AppContainer />
  </Provider>
), document.getElementById('react-target'));
