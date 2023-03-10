// filename : index.tsx
// This code imports several modules including React, ReactDOM, and App, as well as a CSS file and a function called "reportWebVitals". It then creates a "root" element on the HTML page and renders the App component inside of it using strict mode. The last line is a call to reportWebVitals, which can be used for performance monitoring.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
