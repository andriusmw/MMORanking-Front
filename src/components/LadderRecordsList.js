import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useLadderRecords from "../hooks/useLadderRecords";

export const LadderRecordList = ({ ladderRecords: initialRecords }) => {
  const [filters, setFilters] = useState({
    difficulty: "*",
    season: "*",
    num_players: "*",
    class1: "*",
    class2: "*",
    server: "*",
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState(null); // Null inicialmente
  const [useLocalData, setUseLocalData] = useState(false);

  // Solo usar el hook cuando appliedFilters no sea null
  const { ladderRecords: fetchedRecords, loading, error } = useLadderRecords(
    appliedFilters || undefined
  );

  // Decidir qué datos mostrar
  const recordsToDisplay = useLocalData && appliedFilters ? fetchedRecords : initialRecords;

  const filterOptions = {
    dungeon_name: ["*", "Earthcrawl Mines", "The Stonevault" , "The Dawnbreaker" ],
    difficulty: ["*", "Normal", "Heroic", "Mythic"],
    season: ["*", "Season1", "Season2", "Season3"],
    num_players: ["*", "2", "3", "4", "5"],
    class1: ["*", "Warrior", "Mage", "Rogue", "Priest"],
    class2: ["*", "Tank", "DPS", "Healer"],
    server: ["*", "EU", "NA", "Asia"],
  };

  console.log("initialRecords:", initialRecords);
console.log("fetchedRecords:", fetchedRecords);

  const handleHeaderClick = (column) => {
    setOpenDropdown(openDropdown === column ? null : column);
  };

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    const newFilters = {
      dungeon_name: filters.dungeon_name,
      dungeonDifficulty: filters.difficulty,
      season: filters.season,
      numPlayers: filters.num_players,
      charClass: filters.class1,
      charSpec: filters.class2,
      server: filters.server,
    };
    setAppliedFilters(newFilters);
    setUseLocalData(true);
  };

  const columnMap = {
    character_name: "Character Name",
    class1: "Class",
    class2: "Spec",
    dungeon_name: "Dungeon Name",
    difficulty: "Difficulty",
    season: "Season",
    time: "Time",
    num_players: "Num.Players",
    server: "Server",
    date_completed: "Date",
    status: "Status",
  };

  if (loading && useLocalData) return <p>Loading...</p>;
  if (error && useLocalData) return <p>Error: {error}</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(columnMap).map((column) => (
              <th
                key={column}
                onClick={() => filterOptions[column] && handleHeaderClick(column)}
                style={{ cursor: filterOptions[column] ? "pointer" : "default", position: "relative" }}
              >
                {columnMap[column]} {filters[column] === "*" ? "↓" : "↑"}
                {openDropdown === column && filterOptions[column] && (
                  <select
                    value={filters[column]}
                    onChange={(e) => handleFilterChange(column, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 10,
                    }}
                  >
                    {filterOptions[column].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}
              </th>
            ))}
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {recordsToDisplay.length ? (
            recordsToDisplay.map((record) => (
              <tr key={record.id}>
                <td>{record.character_name}</td>
                <td>{record.class1}</td>
                <td>{record.class2}</td>
                <td>{record.dungeon_name}</td>
                <td>{record.difficulty}</td>
                <td>{record.season}</td>
                <td>{record.time}</td>
                <td>{record.num_players}</td>
                <td>{record.server}</td>
                <td>{new Date(record.date_completed).toLocaleString()}</td>
                <td>{record.status}</td>
                <td>
                  <Link to={`/record/${record.id}`}>+</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Object.keys(columnMap).length + 1}>There are no records</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleSearch} style={{ marginTop: "10px" }}>
        Buscar
      </button>
    </div>
  );
};