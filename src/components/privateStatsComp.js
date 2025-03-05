import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import usePrivateStats from '../hooks/usePrivateStats';

export const PrivateStatsComp = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const { pstats, loading, error, fetchStatsByDate } = usePrivateStats();

  const handleSearch = () => {
    if (startDate && endDate) {
      fetchStatsByDate(startDate, endDate);
    }
  };

  return (
    <div className="form-section">
        <h2>Private Stats</h2>
        <div className="form-container">
      <button 
        onClick={() => setShowCalendar(!showCalendar)}
        style={{ marginBottom: '10px' }}
      >
        {showCalendar ? 'Hide Calendar' : 'Select Time Range'}
      </button>

      {showCalendar && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div>
              <label>Start Date: </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label>End Date: </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Select end date"
              />
            </div>
            <button 
              onClick={handleSearch}
              disabled={!startDate || !endDate || loading}
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
        </div>
      )}

      {loading && <p>Loading stats...</p>}
      {error && <p>Error: {error}</p>}
      {pstats ? (
        <div>
          <p>Total number of users: {pstats.totalUsers}</p>
          <p>Total of users logged in the last 24h: {pstats.recentLogins}</p>
          <p>Total number of records: {pstats.totalRecords}</p>
          <p>Total users from EU servers: {pstats.euUsers}</p>
          <p>Total users from US servers: {pstats.usUsers}</p>
          <p>Total users from TW servers: {pstats.twUsers}</p>
          <p>Most used Class on records: {pstats.mostUsedClass}</p>
          <p>Most repeated Dungeon on records: {pstats.mostRepeatedDungeon}</p>
          <p>Most repeated difficulty on records: {pstats.mostRepeatedDifficulty}</p>
          <p>Most used mode of playing(1P, 2P, 3P, 4P, 5P): {pstats.mostCommonNumPlayers}P</p>
        </div>
      ) : (
        !loading && !error && <p>Please select a date range to view stats</p>
      )}
      </div>
    </div>
  );
};