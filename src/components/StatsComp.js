import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useRef, useState, useEffect } from 'react';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export const StatsComp = ({ stats }) => {
  const chartRef = useRef(null);
  const [chartImage, setChartImage] = useState(null);

  // Prepare data for the pie chart
  const pieData = {
    labels: ['EU Users', 'US Users', 'TW Users'],
    datasets: [
      {
        data: stats ? [stats.euUsers, stats.usUsers, stats.twUsers] : [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Distribution by Region',
      },
    },
  };

  // Convert chart to image after rendering
  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const image = chart.toBase64Image(); // Convert the chart canvas to a base64 image
      setChartImage(image);
    }
  }, [stats]);

  return stats ? (
    <section className="form-section stats-section">
      <div className="stats-container">
        <form className="form-container stats-form" id="stats-form">
          <h2>Total numbers</h2>
          <p>Total number of users: {stats.totalUsers}</p>
          <p>Total number of records: {stats.totalRecords}</p>
          <p>Total users from EU servers: {stats.euUsers}</p>
          <p>Total users from US servers: {stats.usUsers}</p>
          <p>Total users from TW servers: {stats.twUsers}</p>
          <p>Most used Class on records: {stats.mostUsedClass}</p>
          <p>Most repeated Dungeon on records: {stats.mostRepeatedDungeon}</p>
          <p>Most repeated difficulty on records: {stats.mostRepeatedDifficulty}</p>
          <p>Most used mode of playing(1P, 2P, 3P, 4P, 5P): {stats.mostCommonNumPlayers}P</p>
        </form>

        {/* Pie Chart */}
        <div className="pie-chart-container">
          <div className="chart-wrapper">
            <Pie ref={chartRef} data={pieData} options={options} />
          </div>
          {/* Hidden image for PDF rendering */}
          {chartImage && (
            <img
              src={chartImage}
              alt="User Distribution Chart"
              className="chart-image-for-pdf"
              style={{ display: 'none' }}
            />
          )}
        </div>
      </div>
    </section>
  ) : (
    <p>There are no records</p>
  );
};