import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, // Import ArcElement for pie charts
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend); // Register ArcElement for pie charts

const ArticleChart = () => {
  const data = {
    labels: ['2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Publications',
        data: [10, 15, 8, 20],
        backgroundColor: [
          'rgba(14, 172, 225, 0.95)',
          'rgba(236, 12, 60, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
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
    },
  };

  return <Pie data={data} options={options} />; // Render the pie chart
};

export default ArticleChart;