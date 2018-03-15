import React from 'react';
import PropTypes from 'prop-types'
import update from 'immutability-helper';

import AppointmentForm from './appointment_form'
import AppointmentsList from './appointments_list'
import { FormErrors } from './FormErrors'
import * as API from '../utils/API'

export default class Appointments extends React.Component {
  static propTypes = {
    appointments: PropTypes.array.isRequired
  };

  static defaultProps = {
    appointments: []
  };

  constructor(props) {
    super(props);
    this.state = {
      appointments: this.props.appointments,
      title: '',
      appt_time: '',
      formErrors: {},
      formValid: false
    };
  }

  componentDidMount() {
    API.get().then((appointments) => this.setState({appointments}))
  }

  addNewAppointment(appointment) {
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

    API.create(appointment)
      .then((data) => {
        this.addNewAppointment(data);
        this.resetFormErrors()
      })
      .catch((error) => {
        this.setState({formErrors: error.response.data})
      })
  }

  handleUserInput(obj) {
    console.log(this.state)
    this.setState(obj, this.validateForm);
  }

  resetFormErrors() {
    this.setState({formErrors: {}})
  }

  validateForm() {
    this.setState({formValid: this.state.title.trim().length > 2})
    console.log(this.state)
  }

  render() {
    return(
      <div>
        <h1>Calendar React</h1>
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm
          title={this.state.title}
          formValid={this.state.formValid}
          appt_time={this.state.appt_time}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()}/>
        <AppointmentsList appointments={this.state.appointments}/>
      </div>
    )
  }
}