import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import App from './components/App';
import reducers from './reducers';

require('./app.scss');

const store = createStore(reducers);

render((
  <Provider store={ store }>
    <App />
  </Provider>
), document.getElementById('react-target'));
