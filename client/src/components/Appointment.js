import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { formatDate } from '../utils/format';
import * as API from '../utils/API';

class Appointment extends Component {
  constructor(props){
    super(props);
    this.state = {
      appointment: props.appointment
    }
  }

  componentDidMount() {
    if (this.props.match) {
    API.getById(this.props.match.params.id)
      .then((appointment) => this.setState({appointment}));
    }
  }

  render() {
    const { appointment } = this.state;

    return (
      <div className="appointment">
        <Link to={`/appointments/${appointment.id}`}>
          <h3>{appointment.title}</h3>
        </Link>
        <p>{formatDate(appointment.appt_time)}</p>
        <Link to={`/appointments/${appointment.id}/edit`}>
          Edit
        </Link>
      </div>
    )
  }
}

Appointment.propTypes = {
  appointment: PropTypes.object.isRequired
};

Appointment.defaultProps = {
  appointment: {}
};

export default Appointment;
