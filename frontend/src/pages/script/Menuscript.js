import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const MenuscriptChart = () => {
  const data = {
    labels: ['2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Publications',
        data: [10, 15, 8, 20],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display:false , 
        position: 'top',
      },
      title: {
        display:false , 
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default MenuscriptChart;


