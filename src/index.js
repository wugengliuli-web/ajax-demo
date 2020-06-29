import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css'; 
// import App from './App';
import App from './App2'
import { InputItem, List } from 'antd-mobile'
ReactDOM.render(
  <React.StrictMode>
    <List>
      <InputItem type="phone" />
      <InputItem type="phone" />
    </List>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
