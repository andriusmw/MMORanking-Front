

export const StatsComp = ({ stats }) => {
   // console.log("stats", stats)

  return stats ? (
    <section className="form-section stats-section" >
      <form className="form-container stats-form" id="stats-form">
        <h2>Total numbers</h2>
        <p>Total number of users: {stats.totalUsers} </p>
        <p>total number of records: {stats.totalRecords}</p>
        <p>Total users from EU servers: {stats.euUsers} </p>
        <p>Total users from US servers: {stats.usUsers}</p>
        <p>Total users from TW servers: {stats.twUsers}</p>
        <p>Most used Class on records: {stats.mostUsedClass}</p>
        <p>Most repeated Dungeon on records: {stats.mostRepeatedDungeon}</p>
        <p>Most repeated difficulty on records: {stats.mostRepeatedDifficulty}</p>
        <p>Most used mode of playing(1P, 2P, 3P, 4P, 5P): {stats.mostCommonNumPlayers}P</p>
        </form>
    </section>
  ) : (
    <p>There are no records</p>
  );
};
