//import { Record } from "./Record";
import { Link } from "react-router-dom";

export const RecordList = ({ records }) => {
  return records.length ? (
    <table>
      <thead>
        <tr>
          <th>Character Name</th>
          <th>Class</th>
          <th>Dungeon Name</th>
          <th>Difficulty</th>
          <th>Season</th>
          <th>time</th>
          <th>Num.Players</th>
          <th>Server</th>
          <th>Date</th>
          <th>status</th>
          <th>Details</th>
     
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.character_name}</td>
            <td>{record.class1}</td>
            <td>{record.dungeon_name}</td>
            <td>{record.dungeon_difficulty}</td>
            <td>{record.dungeon_season}</td>
            <td>{record.time}</td>
            <td>{record.num_players}</td>
            <td>{record.server}</td>
            <td>{new Date(record.Date_completed).toLocaleString()}</td>
            <td>{record.status}</td>
            <td><Link to={`/record/${record.id}`}>+</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no records</p>
  );
};
