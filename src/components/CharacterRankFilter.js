import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ajusta la ruta según tu estructura

// Componente hijo que filtra y muestra el rank de un personaje del usuario en los resultados de LadderRecordList
const CharacterRankFilter = ({ ladderRecords }) => {
    console.log("ladderRecords", ladderRecords)

  // Obtiene el usuario logueado desde el AuthContext
  const { user } = useContext(AuthContext);

  // Estado para el personaje seleccionado por el usuario (almacena el name para el value)
  const [selectedCharacter, setSelectedCharacter] = useState("select");

  // Estado para almacenar el resultado encontrado (si existe)
  const [characterResult, setCharacterResult] = useState(null);

  // Referencia para el desplegable del filtro
  const characterSelectRef = useRef(null);

  // Lista de personajes del usuario logueado (extraída del AuthContext)
  const userCharacters = user?.characters || [];

  // Opciones del filtro de personajes, empezando con "select"
  const characterOptions = [
    { id: "select", name: "select", class1: "", server: "" }, // Opción inicial
    ...userCharacters.map(char => ({
      id: char.id,
      name: char.name,
      class1: char.class1,
      server: char.server
    }))
  ];

  // Maneja el clic fuera del desplegable para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (characterSelectRef.current && !characterSelectRef.current.contains(event.target)) {
        setSelectedCharacter("select"); // Cierra el desplegable y restablece al valor inicial
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Maneja el cambio en la selección del personaje
  const handleCharacterChange = (e) => {
    const value = e.target.value;
    setSelectedCharacter(value);

    if (value !== "select") {
      // Encuentra el personaje seleccionado en userCharacters para obtener su servidor
      const selectedChar = userCharacters.find(char => char.name === value);
      if (selectedChar) {
        // Busca en ladderRecords usando nombre y servidor
        const foundCharacter = ladderRecords.find(record => 
          record.character_name === selectedChar.name && record.server === selectedChar.server
        );
        if (foundCharacter) {
          // Calcula el puesto/rank basado en el índice en ladderRecords
          const rank = ladderRecords.findIndex(record => 
            record.character_name === selectedChar.name && record.server === selectedChar.server
          ) + 1;
          setCharacterResult({ ...foundCharacter, rank });
        } else {
          setCharacterResult(null); // No se encontró el personaje
        }
      }
    } else {
      setCharacterResult(null); // Restablece si se selecciona "select"
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Filter by Your Characters</h3>
      <div>
        <select
          ref={characterSelectRef}
          value={selectedCharacter}
          onChange={handleCharacterChange}
          style={{ padding: "5px", fontSize: "1em" }}
        >
          {characterOptions.map(option => (
            <option key={option.id} value={option.name}>
              {option.name === "select" ? "select" : `${option.name} (${option.class1} - ${option.server})`}
            </option>
          ))}
        </select>
      </div>
      {characterResult ? (
        <div style={{ marginTop: "10px" }}>
          <p><strong>Rank:</strong> {characterResult.rank}</p>
          <p><strong>Character Name:</strong> {characterResult.character_name}</p>
          <p><strong>Class:</strong> {characterResult.class1}</p>
          <p><strong>Spec:</strong> {characterResult.class2}</p>
          <p><strong>Dungeon Name:</strong> {characterResult.dungeon_name}</p>
          <p><strong>Difficulty:</strong> {characterResult.difficulty}</p>
          <p><strong>Season:</strong> {characterResult.season}</p>
          <p><strong>Time:</strong> {characterResult.time}</p>
          <p><strong>Num. Players:</strong> {characterResult.num_players}</p>
          <p><strong>Server:</strong> {characterResult.server}</p>
        </div>
      ) : selectedCharacter !== "select" ? (
        <p style={{ marginTop: "10px" }}>This character was not found in the ladder results.</p>
      ) : null}
    </div>
  );
};

export default CharacterRankFilter;