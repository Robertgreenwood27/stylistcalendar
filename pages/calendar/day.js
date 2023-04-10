//day.js
import { useRouter } from 'next/router';

function getDayAndYearFromTimestamp(timestamp) {
  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  return { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
}

function formatDate(day, month, year) {
  return `${month + 1}/${day}/${year}`;
}

function DayView({ appointments }) {
  const router = useRouter();
  const { id, month, year } = router.query;

  // Filter appointments by selected month and year
  const filteredAppointments = appointments.filter((appointment) => {
    const { month: appointmentMonth, year: appointmentYear } = getDayAndYearFromTimestamp(appointment.date);
    return appointmentMonth === parseInt(month) && appointmentYear === parseInt(year);
  });

  // Group appointments by day
  const groupedAppointments = filteredAppointments.reduce((acc, appointment) => {
    const day = getDayAndYearFromTimestamp(appointment.date).day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(appointment);
    return acc;
  }, {});

  const daysInMonth = new Date(parseInt(year), parseInt(month) + 1, 0).getDate();
  const today = new Date();
  const isToday = (day) => today.getDate() === day && today.getMonth() === parseInt(month) && today.getFullYear() === parseInt(year);

  return (
    <>
  <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">My Calendar</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* Use router.back() to navigate back */}
          <button onClick={() => router.back()} className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Back
          </button>
        </div>
      </div>
    </nav>
      <h1 className="text-center">Day View</h1>
      <div className="flex flex-col items-center space-y-4">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const appointmentsCount = groupedAppointments[day]?.length || 0;
          const fullDate = formatDate(day, parseInt(month), parseInt(year));

          // Check if the current day is before yesterday's date
          const currentDate = new Date(parseInt(year), parseInt(month), day);
          const isPastDate = currentDate < new Date(Date.now() - 86400000); // 86400000 is the number of milliseconds in a day

          if (isPastDate) {
            return null; // Hide the day if it's a past date
          }

          const hasAppointments = appointmentsCount > 0;
          const dayClassName = `rounded-md p-4 w-full h-20 flex flex-col items-center justify-center cursor-pointer ${isToday(day) ? 'bg-green-900' : hasAppointments ? 'bg-purple-900' : 'bg-blue-900'}`;

          return (
            <div
              key={day}
              className={dayClassName}
              onClick={() =>
                router.push(`/calendar/${id}?view=hour&month=${month}&day=${day}&year=${year}`)
              }                            
            >
              <h2 className="text-2xl font-bold">{fullDate}</h2>
              {hasAppointments && <p>{appointmentsCount} appointments</p>}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DayView;