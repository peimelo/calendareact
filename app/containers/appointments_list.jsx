const AppointmentsList = ({appointments}) =>
  <div>
    {appointments.map(function(appointment) {
      return (
        <Appointment key={appointment.id} appointment={appointment}/>
      )
    })}
  </div>;
