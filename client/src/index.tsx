import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { configureStore } from "@reduxjs/toolkit"

import { Provider } from 'react-redux';
import pinsReducer from './features/pinsSlice';
import commentsReducer from './features/commentsSlice';
import repliesReducer from './features/repliesSlice';
import pinSlice  from '../src/features/pinsSlice'

  export const store = configureStore({
    reducer: {
      pinsState: pinsReducer,
      commentsState: commentsReducer,
      repliesState: repliesReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: pinSlice,
      }}),
  })


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
