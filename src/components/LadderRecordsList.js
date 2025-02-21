import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useLadderRecords from "../hooks/useLadderRecords";

export const LadderRecordList = ({ ladderRecords: initialRecords }) => {
  const [filters, setFilters] = useState({
    dungeon_name: "*",
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
    dungeon_name: ["*",
      //Delves
      "Fungal Folly", "Kriegval's Rest", "The Waterworks", "The Dread Pit", "Mycomancer Cavern", "Skittering Breach", "The Sinkhole", 
      "Nightfall Sanctum", "The Underkeep",  "The Spiral Weave", "Zekvir's Lair",  "Tak-Rethan Abyss",  "Sidestreet Sluice","Excavation Site 9",
      //Dungeons
      "Ara-Kara, City of Echoes","City of Threads", "Grim Batol", "Mists of Tirna Scithe", "Siege of Boralus", "The Dawnbreaker",
       "The Necrotic Wake",  "The Stonevault", "Cinderbrew Meadery", "Darkflame Cleft", "The Rookery", "Priory of the Sacred Flame", 
        "The MOTHERLODE!!",  "Theater of Pain",  "Operation: Mechagon - Workshop", "Operation: Floodgate" ],
    difficulty: ["*", "Normal", "Heroic", "Mythic" ,"Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8", "Level 9", "Level 10"],
    season: ["*", "TWW S1", "TWW S2", "TWW S3"],
    num_players: ["*","1","2","3","4","5"],
    class1: ["*", "Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter" , "Mage",  "Monk" , "Paladin", "Priest",  "Rogue", "Shaman", "Warlock", "Warrior" ],
    class2: ["*", "Blood", "Frost", "Unholy", "Havoc", "Vengeance","Balance" , "Feral", "Guardian", "Restoration", "Devastation" , "Preservation","Augmentation", "Beast Mastery", "Marksmanship", "Survival", "Arcane", "Fire", "Frost", "Brewmaster", "Mistweaver", "Windwalker", "Holy", "Protection", "Retribution", "Discipline", "Holy", "Shadow", "Assassination", "Subtlety", "Outlaw", "Elemental", "Enhancement", "Affliction", "Demonology", "Destruction", "Arms", "Fury", "Protecction" ],
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