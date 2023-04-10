//index.js
import { useRouter } from 'next/router';

const stylists = [
    { id: 'Sophia Greenwood', name: 'Sophia Greenwood' },
    { id: 'Kira Quintana', name: 'Kira Quintana' },
    { id: 'Alliyah Valdez', name: 'Alliyah Valdez' },
    { id: 'Sharnel Hagaman', name: 'Sharnel Hagaman' },
    { id: 'Joey Espinoza', name: 'Joey Espinoza' },
    { id: 'Paisley Swope', name: 'Paisley Swope' },
    { id: 'Jamie Calderon', name: 'Jamie Calderon' },
  ];

export default function Stylists() {
  const router = useRouter();

  const handleSelectStylist = (id) => {
    router.push(`/calendar/${id}`);
  };

  return (
    <div>
      <ul>
        {stylists.map((stylist) => (
          <li key={stylist.id}>
            <button onClick={() => handleSelectStylist(stylist.id)}>
              {stylist.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}