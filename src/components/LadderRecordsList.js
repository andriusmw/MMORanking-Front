import { useState, useMemo, useEffect, useRef } from "react";
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
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [useLocalData, setUseLocalData] = useState(false);
  const [cachedRecords, setCachedRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const { ladderRecords: fetchedRecords, loading, error } = useLadderRecords(
    appliedFilters || undefined
  );

  // Actualizar cachedRecords cuando fetchedRecords cambie tras una búsqueda
  useEffect(() => {
    if (useLocalData && fetchedRecords && fetchedRecords.length >= 0) {
      setCachedRecords(fetchedRecords); // Actualiza siempre con los nuevos resultados
      setCurrentPage(1); // Reinicia a la primera página al obtener nuevos datos
    }
  }, [fetchedRecords, useLocalData]);

  // Usar cachedRecords si hay filtros aplicados, de lo contrario initialRecords
  const recordsToDisplay = useLocalData && appliedFilters ? cachedRecords : initialRecords;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = recordsToDisplay.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(recordsToDisplay.length / recordsPerPage);

  const filterOptions = {
    dungeon_name: [
      "*",
      "Fungal Folly", "Kriegval's Rest", "The Waterworks", "The Dread Pit", "Mycomancer Cavern", "Skittering Breach",
      "The Sinkhole", "Nightfall Sanctum", "The Underkeep", "The Spiral Weave", "Zekvir's Lair", "Tak-Rethan Abyss",
      "Sidestreet Sluice", "Excavation Site 9", "Ara-Kara, City of Echoes", "City of Threads", "Grim Batol",
      "Mists of Tirna Scithe", "Siege of Boralus", "The Dawnbreaker", "The Necrotic Wake", "The Stonevault",
      "Cinderbrew Meadery", "Darkflame Cleft", "The Rookery", "Priory of the Sacred Flame", "The MOTHERLODE!!",
      "Theater of Pain", "Operation: Mechagon - Workshop", "Operation: Floodgate"
    ],
    difficulty: ["*", "Normal", "Heroic", "Mythic", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8", "Level 9", "Level 10"],
    season: ["*", "TWW S1", "TWW S2", "TWW S3"],
    num_players: ["*", "1", "2", "3", "4", "5"],
    class1: ["*", "Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"],
    class2: [
      "*", "Blood", "Frost", "Unholy", "Havoc", "Vengeance", "Balance", "Feral", "Guardian", "Restoration",
      "Devastation", "Preservation", "Augmentation", "Beast Mastery", "Marksmanship", "Survival", "Arcane",
      "Fire", "Frost", "Brewmaster", "Mistweaver", "Windwalker", "Holy", "Protection", "Retribution",
      "Discipline", "Holy", "Shadow", "Assassination", "Subtlety", "Outlaw", "Elemental", "Enhancement",
      "Affliction", "Demonology", "Destruction", "Arms", "Fury", "Protection"
    ],
  };

  const serverInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serverInputRef.current && !serverInputRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleServerInputChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      server: e.target.value || "*",
    }));
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
    setOpenDropdown(null);
    setCachedRecords([]); // Reiniciar cachedRecords para forzar la actualización
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
  };

  if (loading && useLocalData) return <p>Loading...</p>;
  if (error && useLocalData) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Total de resultados: {recordsToDisplay.length}</p>
      <table>
        <thead>
          <tr><th>Puesto</th>{Object.keys(columnMap).map((column) => (
              <th
                key={column}
                onClick={() => (filterOptions[column] || column === "server") && handleHeaderClick(column)}
                style={{ cursor: filterOptions[column] || column === "server" ? "pointer" : "default", position: "relative" }}
              >
                {columnMap[column]} {filters[column] === "*" ? "↓" : "↑"}
                {openDropdown === column && (
                  <>
                    {column === "server" ? (
                      <input
                        ref={serverInputRef}
                        type="text"
                        value={filters.server === "*" ? "" : filters.server}
                        onChange={handleServerInputChange}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="Enter server name"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          zIndex: 10,
                          width: "150px",
                        }}
                      />
                    ) : (
                      filterOptions[column] && (
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
                      )
                    )}
                  </>
                )}
              </th>
            ))}<th>Details</th></tr>
          <tr><th style={{ fontWeight: "normal", fontSize: "0.9em", color: "#666" }}></th>{Object.keys(columnMap).map((column) => (
              <th key={column} style={{ fontWeight: "normal", fontSize: "0.9em", color: "#666" }}>
                {filters[column]}
              </th>
            ))}<th></th></tr>
        </thead>
        <tbody>
          {currentRecords.length ? (
            currentRecords.map((record, index) => (
              <tr key={record.id}>
                <td>{indexOfFirstRecord + index + 1}</td>
                <td>{record.character_name}</td>
                <td>{record.class1}</td>
                <td>{record.class2}</td>
                <td>{record.dungeon_name}</td>
                <td>{record.difficulty}</td>
                <td>{record.season}</td>
                <td>{record.time}</td>
                <td>{record.num_players}</td>
                <td>{record.server}</td>
                <td>
                  <Link to={`/record/${record.id}`}>+</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Object.keys(columnMap).length + 2}>There are no records</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Siguiente
        </button>
      </div>
      <button onClick={handleSearch} style={{ marginTop: "10px" }}>
        Buscar
      </button>
    </div>
  );
};