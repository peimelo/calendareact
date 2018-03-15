import React from 'react';
import moment from 'moment';
import update from 'immutability-helper';

import AppointmentForm from './components/AppointmentForm'
import AppointmentsList from './components/AppointmentsList'
import { FormErrors } from './components/FormErrors'
import * as API from './utils/API'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      title: { value: '', valid: false },
      appt_time: { value: moment().toDate(), valid: false },
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
    const appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    };

    API.create(appointment)
      .then((data) => {
        this.addNewAppointment(data);
        this.resetFormErrors()
      })
      .catch((error) => {
        this.setState({formErrors: error.response.data})
      })
  };

  handleUserInput = (fieldName, fieldValue) => {
    const newFieldState = update(this.state[fieldName],
      { value: { $set: fieldValue }});
    this.setState({[fieldName]: newFieldState},
      () => { this.validateField(fieldName) });
  };

  resetFormErrors() {
    this.setState({formErrors: {}})
  }

  validateField(fieldName) {
    let fieldValid;
    let fieldErrors = [];

    switch (fieldName) {
      case 'title':
        fieldValid = this.state.title.value.trim().length > 2;
        if (!fieldValid) {
          fieldErrors = [' should be at least 3 characters long'];
        }
        break;
      case 'appt_time':
        fieldValid = moment(this.state.appt_time.value).isValid() &&
          moment(this.state.appt_time.value).isAfter();
        if (!fieldValid) {
          fieldErrors = [' should not be in the past'];
        }
        break;
      default:
        break;
    }

    const newFieldState = update(this.state[fieldName],
      { valid: { $set: fieldValid }});

    const newFormErrors = update(this.state.formErrors,
      { $merge: { [fieldName]: fieldErrors }});

    this.setState({
      [fieldName]: newFieldState,
      formErrors: newFormErrors
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid:  this.state.title.valid &&
        this.state.appt_time.valid
    });
  }

  render() {
    return(
      <div>
        <h1>Calendar React</h1>
        <FormErrors formErrors={this.state.formErrors} />
        <AppointmentForm
          appt_time={this.state.appt_time.value}
          formValid={this.state.formValid}
          title={this.state.title.value}
          onFormSubmit={this.handleFormSubmit}
          onUserInput={this.handleUserInput}
        />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

export default App;
