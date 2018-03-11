import React from 'react';
import PropTypes from 'prop-types'
import update from 'immutability-helper';

import AppointmentForm from './appointment_form'
import { AppointmentsList } from './appointments_list'
import * as API from '../utils/API'

export default class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  }

  static defaultProps = {
    appointments: []
  }

  constructor(props) {
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: '',
      appt_time: 'Tomorrow at 9pm'
    };
  }

  componentDidMount() {
    API.get().then((appointments) => this.setState({appointments}))

    // fetch(`${api}/appointments`)
    //   .then(res => res.json())
    //   .then(data => this.setState({appointments: data}))
  }

  addNewAppointment(appointment) {
    // const appointments = React.addons.update(this.state.appointments, {
    //   $push: [appointment]
    // });
    // this.setState({
    //   appointments: appointments.sort(function(a, b) {
    //     return new Date(a.appt_time) - new Date(b.appt_time);
    //   })
    // });
    const appointments = update(this.state.appointments,
      { $push: [appointment]});
    this.setState({
      appointments: appointments.sort(function(a,b){
        return new Date(a.appt_time) - new Date(b.appt_time);
      })
    });
  }

  handleFormSubmit() {
    const appointment = {title: this.state.title, appt_time: this.state.appt_time};
    // console.log(appointment)
    API.create(appointment).then((data) => this.addNewAppointment(data))

    // fetch(`${api}/appointments`, { method: 'POST' })
    //   .then(data => this.addNewAppointment(data))
    // $.post('/appointments', {appointment: appointment})
    //   .done((data) => {
    //     this.addNewAppointment(data);
    //   });
  }

  handleUserInput(obj) {
    this.setState(obj);
  }

  render() {
    return(
      <div>
        <h1>Calendar React</h1>
        <AppointmentForm
          title={this.state.title}
          appt_time={this.state.appt_time}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()}/>
        <AppointmentsList appointments={this.state.appointments}/>
      </div>
    )
  }
}