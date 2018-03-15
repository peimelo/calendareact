import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

import Label from './Label'

import './react-datetime.css';

class AppointmentForm extends React.Component {
  handleChange = (e) => {
    const fieldName = e.target.name;
    const filedValue = e.target.value;
    this.props.onUserInput(fieldName, filedValue);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  };

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const filedValue = e.toDate();
    this.props.onUserInput(fieldName, filedValue);
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
            value={title}
            onChange={this.handleChange}
          />

          <Datetime
            input={false}
            open={true}
            inputProps={inputProps}
            value={moment(appt_time)}
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
  appt_time: PropTypes.instanceOf(Date).isRequired,
  formValid: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onUserInput: PropTypes.func.isRequired
};

export default AppointmentForm;