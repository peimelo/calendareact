import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Appointments from './components/appointments';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Appointments />, document.getElementById('root'));
registerServiceWorker();
