import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Header from './header';

ReactDOM.render(<Header />, document.getElementById('root'));
registerServiceWorker();
