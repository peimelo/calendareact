var AppointmentsList = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.appointments.map(function(appointment) {
          return (
            <Appointment key={appointment.id} appointment={appointment}/>
          )
        })}
      </div>
    )
  }
});
