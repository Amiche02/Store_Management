import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';


// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Données et options pour le graphique
const data = {
  labels: ['Feb 19', 'Feb 20', 'Feb 21', 'Feb 22', 'Feb 23', 'Feb 24', 'Feb 25'],
  datasets: [
    {
      label: 'Active',
      data: [5, 9, 3, 7, 5, 6, 4],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: true,
    },
    {
      label: 'Completed',
      data: [6, 7, 4, 8, 5, 9, 3],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      fill: true,
    },
    {
      label: 'Canceled',
      data: [3, 2, 1, 4, 3, 5, 2],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      fill: true,
    },
  ],
};

function DashboardCard({ title, value, trend, trendText }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-md text-gray-500">{title}</div>
        </div>
        <div className="text-right">
          <div className={`text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? `+${trend}%` : `${trend}%`}
          </div>
          <div className="text-xs text-gray-400">{trendText}</div>
        </div>
      </div>
      <div className="mt-4">
        <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View</a>
      </div>
    </div>
  );
}

const options = {
  maintainAspectRatio: false, // Ajoutez ceci pour gérer l'aspect ratio
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function Dashboard() {
  // Dummy data for the cards, you should replace these with real data from your backend
  const cardsData = [
    { title: 'Total Books Sold', value: '340', trend: 5, trendText: 'Since last month' },
    { title: 'Total Customers', value: '80', trend: 2, trendText: 'Since last month' },
    { title: 'Books Purchased', value: '120', trend: 3, trendText: 'Since last month' },
    { title: 'Books in Stock', value: '650', trend: -10, trendText: 'Since last month' },
    { title: 'Total Orders', value: '220', trend: 8, trendText: 'Since last month' },
    // ... You can add more card data here
  ];

  return (
    <>
      <div className='my-12 px-4'>
        <p className='mb-8 text-3xl font-bold'>Dashboard</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardsData.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
              trend={card.trend}
              trendText={card.trendText}
            />
          ))}
        </div>

        <div className='my-12 px-4'>
          {/* ... */}
          <div className="w-full h-96">
            <Line data={data} options={options} />
          </div>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
