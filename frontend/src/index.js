import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'
import './index.css';
import App from './App';
import {HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';


ReactDOM.render(<StoreProvider><HelmetProvider><App /></HelmetProvider></StoreProvider>,document.getElementById('root'));
