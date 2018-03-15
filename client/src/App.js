import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'
import update from 'immutability-helper';

import AppointmentForm from './components/AppointmentForm'
import AppointmentsList from './components/AppointmentsList'
import { FormErrors } from './components/FormErrors'
import * as API from './utils/API'

class App extends React.Component {
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

  handleFormSubmit = () => {
    const appointment = {title: this.state.title, appt_time: this.state.appt_time};

    API.create(appointment)
      .then((data) => {
        this.addNewAppointment(data);
        this.resetFormErrors()
      })
      .catch((error) => {
        this.setState({formErrors: error.response.data})
      })
  };

  handleUserInput = (obj) => {
    this.setState(obj, this.validateForm);
  };

  resetFormErrors() {
    this.setState({formErrors: {}})
  }

  validateForm() {
    this.setState({
      formValid: this.state.title.trim().length > 2 &&
        moment(this.state.appt_time).isValid() &&
        moment(this.state.appt_time).isAfter()
    })
  }

  render() {
    return(
      <div>
        <h1>Calendar React</h1>
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm
          appt_time={this.state.appt_time}
          formValid={this.state.formValid}
          title={this.state.title}
          onFormSubmit={this.handleFormSubmit}
          onUserInput={this.handleUserInput}
        />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

export default App;
