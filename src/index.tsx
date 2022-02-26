import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import './index.scss';
import './normalize.scss';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/test-cyber-nevod'>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
