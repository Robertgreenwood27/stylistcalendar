//month.js
import { useRouter } from "next/router";

function generateMonthNames() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();

  return monthNames
    .map((monthName, index) => ({ monthName, index }))
    .slice(currentMonth)
    .concat(monthNames.map((monthName, index) => ({ monthName, index })).slice(0, currentMonth));
}


function getMonthAndYearFromTimestamp(timestamp) {
  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  return { month: date.getMonth(), year: date.getFullYear() };
}

function MonthView({ appointments }) {
  const router = useRouter();
  const { id } = router.query;

  const monthNamesWithIndex = generateMonthNames();

  // Initialize the groupedAppointments object with all 12 months
  const groupedAppointments = new Map();

  // Populate the groupedAppointments object with the appointments data
  appointments.forEach((appointment) => {
    const { month, year } = getMonthAndYearFromTimestamp(appointment.date);
    const key = `${year}-${month}`;

    if (!groupedAppointments.has(key)) {
      groupedAppointments.set(key, []);
    }

    groupedAppointments.get(key).push(appointment);
  });

  const displayMonths = 12;
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

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
      <h1 className="text-center">Month View</h1>
      <div className="flex flex-col items-center space-y-4">
        {monthNamesWithIndex.map(({ monthName, index }, iteratorIndex) => {
          const year = currentYear + Math.floor((currentMonthIndex + iteratorIndex) / 12);
          const key = `${year}-${index}`;
          const monthAppointments = groupedAppointments.get(key) || [];
          const isCurrentMonth = index === currentMonthIndex && year === currentYear;

          return (
            <div
              key={key}
              className={`${
                isCurrentMonth ? "bg-green-900" : "bg-blue-900"
              } rounded-md p-4 w-full max-w-md h-52 flex flex-col items-center justify-center`}
              onClick={() =>
                router.push(`/calendar/${id}?view=day&month=${index}&year=${year}`)
              }
            >
              <h2 className="text-xl font-bold">{`${monthName} ${year}`}</h2>
              <p>{monthAppointments.length} appointments</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MonthView;