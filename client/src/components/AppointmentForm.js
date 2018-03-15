import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

import Label from './Label'
import { validations } from '../utils/validations';

import './react-datetime.css';

class AppointmentForm extends React.Component {
  static formValidations = {
    title: [
      (s) => validations.checkMinLength(s, 3),
      (s) => validations.checkMaxLength(s, 250)
    ],
    appt_time: [
      (t) => validations.timeShouldBeInTheFuture(t)
    ]
  };

  handleChange = (e) => {
    const fieldName = e.target.name;
    const filedValue = e.target.value;
    this.props.onUserInput(
      fieldName,
      filedValue,
      AppointmentForm.formValidations[fieldName]
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const filedValue = e.toDate();
    this.props.onUserInput(
      fieldName,
      filedValue,
      AppointmentForm.formValidations[fieldName]
    );
  };

  render() {
    const { appt_time, formValid, title } = this.props;
    const inputProps = { name: 'appt_time' };

    return(
      <div>
        <h2>Make a new appointment</h2>
        <Label label="Enter a title, date and time" />
        <form onSubmit={this.handleSubmit}>
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
            value="Make Appointment"
            className="submit-button"
            disabled={!formValid}
          />
        </form>
      </div>
    )
  }
}

AppointmentForm.propTypes = {
  appt_time: PropTypes.shape({
    value: PropTypes.instanceOf(Date).isRequired,
    valid: PropTypes.bool.isRequired
  }).isRequired,
  formValid: PropTypes.bool.isRequired,
  title: PropTypes.shape({
    value: PropTypes.string.isRequired,
    valid: PropTypes.bool.isRequired
  }).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onUserInput: PropTypes.func.isRequired
};

export default AppointmentForm;