import React from 'react';
import PropTypes from 'prop-types';

import { Appointment } from './Appointment'

function AppointmentsList({ appointments }) {
  return (
    <div>
      {appointments.map((appointment) => (
        <Appointment
          key={appointment.id}
          appointment={appointment}
        />
      ))}
    </div>
  );
}

AppointmentsList.propTypes = {
  appointments: PropTypes.array.isRequired
};

export default AppointmentsList
