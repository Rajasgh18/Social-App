import './index.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

import UserState from './Context/UserContext/UserState';
import PostState from './Context/PostContext/PostState';

import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <Router>
      <UserState>
        <PostState>
          <App />
        </PostState>
      </UserState>
    </Router>
  </React.StrictMode>
  
);
