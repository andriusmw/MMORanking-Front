
//import { Link } from "react-router-dom";

export const CharacterList = ({ characters }) => {
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
            <td><button>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no Characters yet, go to sync your account on your profile</p>
  );
};
