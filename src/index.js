import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy'
import store from './store'


ReactDOM.render(
  <React.StrictMode>
    {/* Surround your application with the StoreProvider component, 
    providing it your store instance. */}
    <StoreProvider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

