import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';
import { store } from './Store/Store.js'
import { Provider } from 'react-redux'
import { Authentication, GetUserProfile } from './Store/Slices/UserSlice.js';
import { GetAllJobs } from './Store/Slices/JobSlice.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(Authentication())
store.dispatch(GetUserProfile())
store.dispatch(GetAllJobs())
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
