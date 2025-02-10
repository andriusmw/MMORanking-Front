import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { deleteCharacterService } from "../services";
import { useState } from "react";

export const CharacterList = ({ characters, onDeleteCharacter }) => {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");

  const deleteChar = async (id) => {
    try {
      await deleteCharacterService({ id, token });
      // Llamar a la función del padre para actualizar el estado
      onDeleteCharacter(id);
    } catch (error) {
      setError(error.message);
    }
  };

  return characters?.length ? (
    <table>
      <thead>
        <tr>
          <th>Character id</th>
          <th>Character Name</th>
          <th>Class</th>
          <th>Server</th>
        </tr>
      </thead>
      <tbody>
        {characters?.map((character) => (
          <tr key={character?.id}>
            <td>{character?.id}</td>
            <td>{character?.name}</td>
            <td>{character?.class1}</td>
            <td>{character?.server}</td>
            <td>
              <button onClick={() => deleteChar(character?.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no Characters yet, go to sync your account on your profile</p>
  );
};