//[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { getStylistAppointments } from '../../firebase';

const MonthView = dynamic(() => import('./month'));
const DayView = dynamic(() => import('./day'));
const HourView = dynamic(() => import('./hour'));

export default function Calendar() {
  const router = useRouter();
  const { id, view } = router.query;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (id) {
      getStylistAppointments(id).then((data) => setAppointments(data));
    }
  }, [id]);

  let ActiveView;

  switch (view) {
    case 'day':
      ActiveView = DayView;
      break;
    case 'hour':
      ActiveView = HourView;
      break;
    default:
      ActiveView = MonthView;
  }


  console.log(appointments)
  return (
    <div>
      <ActiveView appointments={appointments} />
    </div>
  );
}