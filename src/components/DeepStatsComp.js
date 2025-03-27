import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useRef, useState, useEffect } from 'react';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export const DeepStatsComp = ({ Deepstats }) => {
  const dungeonChartRef = useRef(null);
  const [dungeonChartImage, setDungeonChartImage] = useState(null);

  // Prepare data for the Dungeon Frequency Pie Chart
  const dungeonPieData = {
    labels: Deepstats ? Object.keys(Deepstats.dungeonFrequency) : [],
    datasets: [
      {
        data: Deepstats ? Object.values(Deepstats.dungeonFrequency) : [],
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Cyan
          '#9966FF', // Purple
          '#FF9F40', // Orange
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Dungeon Frequency Distribution',
      },
    },
  };

  // Convert Dungeon chart to image
  useEffect(() => {
    const generateDungeonChartImage = () => {
      if (dungeonChartRef.current) {
        const chart = dungeonChartRef.current;
        const image = chart.toBase64Image();
        setDungeonChartImage(image);
      }
    };

    const timer = setTimeout(generateDungeonChartImage, 500);
    return () => clearTimeout(timer);
  }, [Deepstats]);

  return Deepstats ? (
    <section className="form-section stats-section">
      <form className="form-container stats-form" id="stats-section2">
        <h2>Frequencies</h2>

        {/* 1. Frecuencia de cada mazmorra */}
        <div>
          <h3>Frequency of each Dungeon on the records:</h3>
          <ul className='DeepUl'>
            {Object.entries(Deepstats.dungeonFrequency).map(([dungeon, count]) => (
              <li key={dungeon}>
                {dungeon}: {count}
              </li>
            ))}
          </ul>
          {/* Dungeon Frequency Pie Chart */}
          <div className="pie-chart-container DeepChart">
            <div className="chart-wrapper">
              <Pie ref={dungeonChartRef} data={dungeonPieData} options={chartOptions} />
            </div>
            {dungeonChartImage && (
              <img
                src={dungeonChartImage}
                alt="Dungeon Frequency Chart"
                className="chart-image-for-pdf"
                style={{ display: 'none' }}
              />
            )}
          </div>
        </div>

        {/* 2. Frecuencia por número de jugadores */}
        <div>
          <h3>Frequency of Number of players on the records:</h3>
          <ul>
            {Object.entries(Deepstats.playersFrequency).map(([players, count]) => (
              <li key={players}>
                {players} jugador(es): {count}
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Mazmorras por número de jugadores */}
        <div>
          <h3>How many times a Dungeon is done by each type of group of players:</h3>
          {Object.entries(Deepstats.dungeonByPlayersFrequency).map(([dungeon, players]) => (
            <div key={dungeon} className="stats-div">
              <h4>{dungeon}</h4>
              <ul>
                {Object.entries(players).map(([playerKey, count]) => (
                  <li key={playerKey}>
                    {playerKey}: {count}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 4. Dificultades por número de jugadores */}
        <div>
          <h3>How many times a Difficulty is done on the records, sorted by each type of group of players:</h3>
          {Object.entries(Deepstats.difficultyByPlayersFrequency).map(([difficulty, players]) => (
            <div key={difficulty} className="stats-div">
              <h4>{difficulty}</h4>
              <ul>
                {Object.entries(players).map(([playerKey, count]) => (
                  <li key={playerKey}>
                    {playerKey}: {count}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </form>
    </section>
  ) : (
    <p>No hay registros</p>
  );
};