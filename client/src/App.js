import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Appointments from './components/Appointments';
import Appointment from './components/Appointment';
import AppHeader from './components/AppHeader';
import AppointmentForm from './components/AppointmentForm';
import Login from './components/Login';

export default (props) => {
  return (
    <Router>
      <div>
        <Route path="/" component={AppHeader} />
        <Route exact path="/" component={Appointments} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/appointments/:id" component={Appointment} />
        <Route path="/appointments/:id/edit" component={AppointmentForm} />
      </div>
    </Router>
  )
}