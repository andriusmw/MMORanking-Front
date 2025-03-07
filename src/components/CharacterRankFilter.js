import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ajusta la ruta según tu estructura
import { Link } from "react-router-dom";

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
    <>
    
   { user ? (<div className="character-rank">
    <h3>Check your place in the ladder (Filter by your characters)</h3>
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
         

        <table class="ladder-table">
            <thead>
                <tr>
                    <th>
                        Rank
                    </th>
                    <th>
                        Char.Name
                    </th>
                    <th>
                        Class
                    </th>
                    <th>
                        Spec
                    </th>
                    <th>
                        Server
                    </th>
                    <th>
                        Time
                    </th>
                    <th>
                       Details
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                      {characterResult.rank}
                    </td>
                    <td>
                      {characterResult.character_name}
                    </td>
                    <td>
                        {characterResult.class1}
                    </td>
                    <td>
                       {characterResult.class2}
                    </td>
                    <td>
                       {characterResult.time}
                    </td>
                    <td>
                       {characterResult.server}
                    </td>
                    <td>
                          <Link to={`/record/${characterResult.id}`}>
                          <img width="30" height="30" src="/images/icons8-plus-30.png" alt="plus--v1"/>
                          </Link>
                    </td>
                </tr>
            </tbody>
        </table>



        </div>
      ) : selectedCharacter !== "select" ? (
        <p style={{ marginTop: "10px" }}>This character was not found in the ladder results.</p>
      ) : null}
    </div>) : (<p>You need to log in to use this feature</p>)}
    
    </>
  );
};

export default CharacterRankFilter;