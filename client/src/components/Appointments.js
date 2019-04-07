import React, { Component } from 'react';
import update from 'immutability-helper';
import { Container } from 'reactstrap';

import AppointmentForm from './AppointmentForm'
import AppointmentsList from './AppointmentsList'
import * as API from '../utils/API'

class Appointments extends Component {
  state = {
    appointments: this.props.appointments
  };

  componentDidMount() {
    API.getAll()
      .then((appointments) => this.setState({ appointments }))
  }

  addNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments,
      { $push: [appointment] });

    this.setState({
      appointments: appointments.sort(function (a, b) {
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  };

  render() {
    return (
      <Container>
        <AppointmentForm handleNewAppointment={this.addNewAppointment} />
        <AppointmentsList appointments={this.state.appointments} />
      </Container>
    )
  }
}

Appointments.defaultProps = {
  appointments: []
};

export default Appointments;
