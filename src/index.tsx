import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'pages/Home/Home';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="app-container">
      <Home />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
