export const DeepStatsComp = ({ Deepstats }) => {
   // console.log("Deepstats", Deepstats);
  
    return Deepstats ? (
      <section className="form-section stats-section">
      
        <form className="form-container stats-form" id="stats-section2">
        <h2>Frecuencies</h2>
          {/* 1. Frecuencia de cada mazmorra */}
          <div>
            <h3>Frecuency of each Dungeon on the records:</h3>
            <ul>
              {Object.entries(Deepstats.dungeonFrequency).map(([dungeon, count]) => (
                <li key={dungeon}>
                  {dungeon}: {count}
                </li>
              ))}
            </ul>
          </div>
  
          {/* 2. Frecuencia por número de jugadores */}
          <div>
            <h3>Frecuency of Number of players on the records:</h3>
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
            <h3>How much times a Dungeon is done by each type of group of players:</h3>
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
            <h3>How much times a Difficulty is done on the records short by each type of group of players:</h3>
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