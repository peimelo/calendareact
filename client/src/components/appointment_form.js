import React from 'react';
import Datetime from 'react-datetime';
import './react-datetime.css';
import Label from './label'

export default class AppointmentForm extends React.Component {
  handleChange(e) {
    console.log(e)
    const name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setApptTime(e) {
    console.log(e)
    const name = 'appt_time';
    var obj = {};
    if (obj[name] = e.toDate()) {
      console.log('oi')
      this.props.onUserInput(obj);
    }
  }

  render() {
    const inputProps = { name: 'appt_time' };

    return(
      <div>
        <h2>Make a new appointment</h2>
        <Label label="Enter a title, date and time" />
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            name="title"
            placeholder="Appointment Title"
            type="text"
            value={this.props.title}
            onChange={(event) => this.handleChange(event)} />

          <Datetime
            input={false}
            open={true}
            inputProps={inputProps}
            value={this.props.appt_time}
            onChange={(event) => this.setApptTime(event)}/>

          <input
            type="submit"
            value="Make Appointment"
            className="submit-button"
            disabled={!this.props.formValid}
          />
        </form>
      </div>
    )
  }
}