import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import useLadderRecords from "../hooks/useLadderRecords";
import CharacterRankFilter from "./CharacterRankFilter"; // Ajusta la ruta según tu estructura
import { AuthContext } from "../context/AuthContext"; // Ajusta la ruta según tu estructura

// Componente que muestra una lista paginada de registros con filtros seleccionables
export const LadderRecordList = ({ ladderRecords: initialRecords = [] }) => {
  
  // Obtiene el usuario logueado desde el AuthContext
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  // Estado para almacenar los filtros seleccionados por el usuario
  const [filters, setFilters] = useState({
    dungeon_name: null,
    difficulty: null,
    season: null,
    num_players: null,
    class1: "select",
    class2: "select",
    server: "",
  });
  // state to load the spinner
  const [isLoading, setIsLoading] = useState(false);

  // Estado para controlar qué desplegable/input está abierto
  const [openDropdown, setOpenDropdown] = useState(null);

  // Estado para los filtros aplicados que se envían al hook
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Estado que indica si se usan datos locales (filtrados) o iniciales
  const [useLocalData, setUseLocalData] = useState(false);

  // Estado para almacenar los registros obtenidos del servidor en caché
  const [cachedRecords, setCachedRecords] = useState([]);

  // Estado para la página actual en la paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Constante que define cuántos registros se muestran por página
  const recordsPerPage = 10;

  // Hook personalizado para obtener registros del backend cuando appliedFilters cambia
  const { ladderRecords: fetchedRecords, loading, error } = useLadderRecords(appliedFilters, token);


  // Detectar cambios en el tamaño de la pantalla
function updateHeaderText() {
  const headers = document.querySelectorAll('.ladder-table thead th');
  const isMobile = window.innerWidth <= 768;

  headers.forEach((header, index) => {
      if (isMobile) {
          // Cambiar el texto a abreviaturas
          switch (index) {
              case 0: header.textContent = 'RK'; break; // Rank
              case 1: header.textContent = 'CN'; break; // Char.Name
              case 2: header.textContent = 'CL'; break; // Class
              case 3: header.textContent = 'SP'; break; // Spec
              case 4: header.textContent = 'DN'; break; // Dungeon Name
              case 5: header.textContent = 'DF'; break; // Difficulty
              case 6: header.textContent = 'SN'; break; // Season
              case 7: header.textContent = 'TM'; break; // Time
              case 8: header.textContent = 'PL'; break; // Players
              case 9: header.textContent = 'SV'; break; // Server
              case 10: header.textContent = 'DT'; break; // Details
              default: break;
          }
      } else {
          // Restaurar el texto original (debes almacenarlo o definirlo en tu HTML/JS)
          switch (index) {
              case 0: header.textContent = 'Rank'; break;
              case 1: header.textContent = 'Char.Name'; break;
              case 2: header.textContent = 'Class'; break;
              case 3: header.textContent = 'Spec'; break;
              case 4: header.textContent = 'Dungeon'; break;
              case 5: header.textContent = 'Difficulty'; break;
              case 6: header.textContent = 'Season'; break;
              case 7: header.textContent = 'Time'; break;
              case 8: header.textContent = 'Players'; break;
              case 9: header.textContent = 'Server'; break;
              case 10: header.textContent = 'Details'; break;
              default: break;
          }
      }
  });
}

// Llamar a la función al cargar la página y al redimensionar la ventana
window.addEventListener('load', updateHeaderText);
window.addEventListener('resize', updateHeaderText);

  // Actualiza cachedRecords cuando se obtienen nuevos datos del servidor
  useEffect(() => {
    if (useLocalData && fetchedRecords && fetchedRecords.length >= 0) {
      setCachedRecords(fetchedRecords); // Guarda los nuevos registros en el caché
      setCurrentPage(1); // Reinicia a la primera página al cargar nuevos datos
    }
  }, [fetchedRecords, useLocalData]);

  // Determina qué registros mostrar: cachedRecords si hay filtros aplicados, initialRecords si no
  const recordsToDisplay = useLocalData && appliedFilters ? cachedRecords : initialRecords;

  // Calcula los índices para la paginación
  const indexOfLastRecord = currentPage * recordsPerPage; // Índice del último registro en la página actual
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage; // Índice del primer registro en la página actual
  const currentRecords = recordsToDisplay.slice(indexOfFirstRecord, indexOfLastRecord); // Registros de la página actual
  const totalPages = Math.ceil(recordsToDisplay.length / recordsPerPage); // Número total de páginas

  // Opciones disponibles para cada filtro en los desplegables
  const filterOptions = {
    dungeon_name: [
      "Ara-Kara, City of Echoes", "City of Threads", "Grim Batol",
      "Mists of Tirna Scithe", "Siege of Boralus", "The Dawnbreaker", "The Necrotic Wake", "The Stonevault",
      "Cinderbrew Meadery", "Darkflame Cleft", "The Rookery", "Priory of the Sacred Flame", "The MOTHERLODE!!",
      "Theater of Pain", "Operation: Mechagon - Workshop", "Operation: Floodgate"
    ],
    difficulty: [
      "select", "Normal", "Heroic", "Mythic", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7", "Level 8", "Level 9", "Level 10"
    ],
    season: ["select", "TWW S1", "TWW S2", "TWW S3"],
    num_players: ["select", "1", "2", "3", "4", "5"],
    class1: ["select", "*", "Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"],
    class2: [
      "select", "*", "Blood", "Frost", "Unholy", "Havoc", "Vengeance", "Balance", "Feral", "Guardian", "Restoration",
      "Devastation", "Preservation", "Augmentation", "Beast Mastery", "Marksmanship", "Survival", "Arcane",
      "Fire", "Frost", "Brewmaster", "Mistweaver", "Windwalker", "Holy", "Protection", "Retribution",
      "Discipline", "Holy", "Shadow", "Assassination", "Subtlety", "Outlaw", "Elemental", "Enhancement",
      "Affliction", "Demonology", "Destruction", "Arms", "Fury", "Protection"
    ],
  };

  // Referencia para el input de "server" para detectar clics fuera de él
  const serverInputRef = useRef(null);

  // Configura un listener para cerrar el input de "server" al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verifica si el clic ocurrió fuera del input de "server"
      if (serverInputRef.current && !serverInputRef.current.contains(event.target)) {
        setOpenDropdown(null); // Cierra el input
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside); // Limpia el listener al desmontar
  }, []);

  // Maneja el clic en una cabecera para abrir o cerrar su desplegable/input
  const handleHeaderClick = (column) => {
    setOpenDropdown(openDropdown === column ? null : column); // Alterna entre abrir y cerrar
  };

  // Actualiza el filtro seleccionado desde un <select> y cierra el desplegable
  const handleFilterChange = (column, value) => {
    // Convierte "select" a null para campos obligatorios, usa el valor directamente para otros
    const newValue = value === "select" && (column === "dungeon_name" || column === "difficulty" || column === "season" || column === "num_players" ) ? null : value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: newValue, // Actualiza el filtro correspondiente
    }));
    setOpenDropdown(null); // Cierra el desplegable tras seleccionar
  };

  // Actualiza el filtro "server" desde el <input> basado en lo que escribe el usuario
  const handleServerInputChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      server: e.target.value || "", // Usa el valor ingresado o vacío si no hay texto
    }));
  };

  // Inicia una búsqueda con los filtros seleccionados, validando campos obligatorios
  const handleSearch = () => {
    // Valida que los campos obligatorios tengan valores seleccionados
    setIsLoading(true)
    if (!filters.dungeon_name || !filters.difficulty || !filters.season || !filters.num_players ) {
      setIsLoading(false);
      alert("Please select a value for Dungeon Name, Difficulty, Season and Players.");
      return;
    }

    // Construye el objeto de filtros para enviar al backend
    const newFilters = {
      dungeon_name: filters.dungeon_name,
      dungeonDifficulty: filters.difficulty,
      season: filters.season,
      numPlayers: filters.num_players,
      charClass: filters.class1 === "select" ? "*" : filters.class1,           // "select" se convierte a "*"
      charSpec: filters.class2 === "select" ? "*" : filters.class2,           // "select" se convierte a "*"
      server: filters.server || "*",                                           // "" se convierte a "*"
    };
    setAppliedFilters(newFilters); // Establece los filtros para el hook
    setUseLocalData(true); // Indica que se usarán datos filtrados
    setOpenDropdown(null); // Cierra cualquier desplegable/input
    setCachedRecords([]); // Reinicia el caché para nuevos datos
    setIsLoading(false); 
  };

  // Limpia todos los filtros y restablece el estado inicial
  const handleClearFilters = () => {
    setFilters({
      dungeon_name: null,
      difficulty: null,
      season: null,
      num_players: null,
      class1: "select",
      class2: "select",
      server: "",
    }); // Restablece los filtros a sus valores iniciales
    setAppliedFilters(null); // Elimina los filtros aplicados
    setUseLocalData(false); // Vuelve a usar initialRecords
    setCachedRecords([]); // Limpia el caché
    setCurrentPage(1); // Reinicia la paginación
    setOpenDropdown(null); // Cierra cualquier desplegable/input
  };

  // Cambia la página actual en la paginación
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage); // Actualiza la página actual
  };

  // Mapeo de nombres de columnas a etiquetas visibles en la tabla (usado para headers y abreviaturas)
  const columnMap = {
    character_name: "Char.Name",
    class1: "Class",
    class2: "Spec",
    dungeon_name: "Dungeon Name",
    difficulty: "Difficulty",
    season: "Season",
    time: "Time",
    num_players: "Players",
    server: "Server",
  };

  // Mapeo para abreviaturas de 2 iniciales en pantallas pequeñas
  const columnAbbreviations = {
    "Char.Name": "CN",
    "Class": "CL",
    "Spec": "SP",
    "Dungeon Name": "DN",
    "Difficulty": "DF",
    "Season": "SN",
    "Time": "TM",
    "Players": "PL",
    "Server": "SV",
  };

  // Muestra mensajes de carga o error si corresponde
  if (loading && useLocalData) return <p>Loading...</p>;
  if (error && useLocalData) return <p>Error: {error}</p>;

  return (
    <>
    {user ? (  
      <div>
      <table className="ladder-table">
        <thead>
          <tr>
            <th>Rank</th>
            {Object.keys(columnMap).map((column) => (
              <th
                key={column}
                data-label={columnMap[column]} /* Store full label for accessibility */
                onClick={() => (filterOptions[column] || column === "server") && handleHeaderClick(column)}
                style={{ cursor: filterOptions[column] || column === "server" ? "pointer" : "default", position: "relative" }}
              >
                {columnMap[column]}
                {filters[column] === null || filters[column] === "select" || filters[column] === "" ? "↓" : "↑"}
                {openDropdown === column && (
                  <>
                    {column === "server" ? (
                      <input
                        ref={serverInputRef}
                        type="text"
                        value={filters.server}
                        onChange={handleServerInputChange}
                        onClick={(e) => e.stopPropagation()}
                        placeholder="write"
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
                          value={filters[column] || "select"}
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
            ))}
            <th>Details</th>
          </tr>
          <tr>
            <th style={{ fontWeight: "normal", fontSize: "0.9em", color: "#666" }}></th>
            {Object.keys(columnMap).map((column) => (
              <th key={column} style={{ fontWeight: "normal", fontSize: "0.9em", color: "#666" }}>
                {column === "character_name" || column === "time" ? "" : (filters[column] || "select")}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length ? (
            currentRecords.map((record, index) => (
              <tr key={record.id}>
                <td className="rank-cell">{indexOfFirstRecord + index + 1}</td>
                <td className={columnMap.character_name === "Char.Name" ? "truncate-cell" : "rank-cell"}>{record.character_name}</td>
                <td className="truncate-cell">{record.class1}</td>
                <td className="truncate-cell">{record.class2}</td>
                <td className="truncate-cell">{record.dungeon_name}</td>
                <td className="truncate-cell">{record.difficulty}</td>
                <td className="truncate-cell">{record.season}</td>
                <td className="time-cell">{record.time}</td>
                <td className="truncate-cell">{record.num_players}</td>
                <td className="truncate-cell">{record.server}</td>
                <td>
                  <Link to={`/record/${record.id}`}>+</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={Object.keys(columnMap).length + 2}>
                {useLocalData ? "There are no records" : "Select a filter option and click on search to load the ladder"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {recordsToDisplay.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p>Total of Results: {recordsToDisplay.length}</p>
          <div>
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
        </div>
      )}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSearch} style={{ marginRight: "10px" }}>
          Buscar
        </button>
        <button onClick={handleClearFilters}>
          Limpiar
        </button>
      </div>

      {isLoading && ( //Spinner
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Añade el componente hijo, pasando los resultados de la búsqueda */}
      <CharacterRankFilter ladderRecords={recordsToDisplay} />
    </div>
    ) : (
      <p>You need to log in to use this feature</p>
    )}
    </>
  );
};

export default LadderRecordList;