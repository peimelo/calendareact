import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import update from 'immutability-helper';

import { FormErrors } from './FormErrors'
import Label from './Label'
import { validations } from '../utils/validations';

import './react-datetime.css';
import * as API from '../utils/API';

class AppointmentForm extends React.Component {
  state = {
    appt_time: { value: moment().toDate(), valid: false },
    editing: false,
    formErrors: {},
    formValid: false,
    title: { value: '', valid: false },
  };

  static formValidations = {
    title: [
      (s) => validations.checkMinLength(s, 3),
      (s) => validations.checkMaxLength(s, 250)
    ],
    appt_time: [
      (t) => validations.timeShouldBeInTheFuture(t)
    ]
  };

  componentDidMount() {
    if (this.props.match) {
      API.getById(this.props.match.params.id)
        .then((appointment) =>
          this.setState({
            title: { value: appointment.title, valid: true },
            appt_time: { value: appointment.appt_time, valid: true },
            editing: this.props.match.path === '/appointments/:id/edit'
          })
        );
    }
  }

  addAppointment() {
    const appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    };

    API.create(appointment)
      .then((data) => {
        this.props.handleNewAppointment(data);
        this.resetFormErrors()
      })
      .catch((error) => {
        this.setState({
          formErrors: error.response.data,
          formValid: false
        })
      })
  }

  deleteAppointment = () => {
    // if (confirm('Are you sure you want to delete this appointment?')) {
      API.destroy(this.props.match.params.id)
        .then(this.props.history.push('/'))
    // }
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const filedValue = e.target.value;
    this.handleUserInput(
      fieldName,
      filedValue,
      AppointmentForm.formValidations[fieldName]
    );
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.state.editing ?
      this.updateAppointment() :
      this.addAppointment();
  };

  handleUserInput = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName],
      { value: { $set: fieldValue }});
    this.setState({[fieldName]: newFieldState},
      () => { this.validateField(fieldName, fieldValue, validations) });
  };

  resetFormErrors() {
    this.setState({ formErrors: {} })
  }

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const filedValue = e.toDate();
    this.handleUserInput(
      fieldName,
      filedValue,
      AppointmentForm.formValidations[fieldName]
    );
  };

  updateAppointment() {
    const appointment = {
      title: this.state.title.value,
      appt_time: this.state.appt_time.value
    };

    API.update(this.props.match.params.id, appointment)
      .then(this.resetFormErrors())
      .catch((error) => {
        this.setState({
          formErrors: error.response.data,
          formValid: false
        })
      })
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;

    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if (e !== '') {
        errors.push(e);
      }
      return errors;
    }, []);

    fieldValid = fieldErrors.length === 0;

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
    const { appt_time, formValid, title } = this.state;
    const inputProps = { name: 'appt_time' };

    return (
      <div>
        <h2>
          { this.state.editing ?
            'Update appointment' :
            'Make a new appointment'}
        </h2>
        <FormErrors formErrors={this.state.formErrors} />
        <Label label="Enter a title, date and time"/>
        <form onSubmit={this.handleFormSubmit}>
          <input
            name="title"
            placeholder="Appointment Title"
            type="text"
            value={title.value}
            onChange={this.handleChange}
          />

          <Datetime
            input={false}
            open={true}
            inputProps={inputProps}
            value={moment(appt_time.value)}
            onChange={this.setApptTime}
          />

          <input
            type="submit"
            value={ this.state.editing ?
              'Update Appointment' :
              'Make Appointment'}
            className="submit-button"
            disabled={!formValid}
          />
        </form>
        {this.state.editing && (
          <p>
            <button onClick={this.deleteAppointment}>
              Delete Appointment
            </button>
          </p>
        )}
      </div>
    )
  }
}

AppointmentForm.propTypes = {
  handleNewAppointment: PropTypes.func
};

export default AppointmentForm;