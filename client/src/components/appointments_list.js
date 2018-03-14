import React from 'react';

import { Appointment } from './appointment'

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

export default AppointmentsList
