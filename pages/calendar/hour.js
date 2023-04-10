  import { useRouter } from 'next/router';
  

  function HourView({ appointments }) {
    const router = useRouter();
    const { id, month, day, year } = router.query;

    // Filter appointments by selected day
    const filteredAppointments = appointments.filter((appointment) => {
      const date = appointment.date.toDate();
      return (
        date.getDate() === parseInt(day) &&
        date.getMonth() === parseInt(month) &&
        date.getFullYear() === parseInt(year)
      );
    });

    const startHour = 5; // 5:00 am
    const endHour = 24; // Midnight
    const incrementsPerHour = 2; // Half-hour increments

    const hours = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let increment = 0; increment < incrementsPerHour; increment++) {
        const time = `${hour}:${increment === 0 ? '00' : '30'}`;
        hours.push(time);
      }
    }

    const currentTime = new Date();
    const isPastTime = (hour, minutes) => {
      const blockDate = new Date(parseInt(year), parseInt(month), parseInt(day), hour, minutes);
      return blockDate < currentTime;
    };

    const hasAppointment = (hour, minutes) => {
      const blockDate = new Date(parseInt(year), parseInt(month), parseInt(day), hour, minutes);
      return filteredAppointments.some((appointment) => {
        const appointmentDate = appointment.date.toDate();
        return appointmentDate.getTime() === blockDate.getTime();
      });
    };

    const formatTime = (hour, minutes) => {
      const hour12 = hour % 12 || 12;
      const ampm = hour < 12 ? 'am' : 'pm';
      return `${hour12}:${minutes} ${ampm}`;
    };
    

    return (
      <div className="flex flex-col items-center space-y-4">
        {hours.map((time) => {
    const [hour, minutes] = time.split(':');
    const pastTime = isPastTime(parseInt(hour), parseInt(minutes));
    const appointment = filteredAppointments.find((appointment) => {
      const appointmentDate = appointment.date.toDate();
      const blockDate = new Date(parseInt(year), parseInt(month), parseInt(day), parseInt(hour), parseInt(minutes));
      return appointmentDate.getTime() === blockDate.getTime();
    });

    const blockClassName = `rounded-md p-4 w-full ${
      pastTime ? 'bg-gray-500' : appointment ? 'bg-purple-900' : 'bg-blue-900'
    } flex flex-col items-center justify-center ${appointment ? 'h-auto py-4' : 'h-20'}`;
    

    return (
      <div key={time} className={blockClassName}>
        <h2 className="text-xl font-bold">{formatTime(parseInt(hour), minutes)}</h2>
        {appointment && (
          <div className="flex flex-col items-center space-y-1">
            <p>Customer: {appointment.customerName}</p>
            <p>Email: {appointment.email}</p>
            <p>Phone: {appointment.phoneNumber}</p>
            <p>Service: {appointment.service}</p>
          </div>
        )}
      </div>
    );
  })}

      </div>
    );
  }

  export default HourView;
