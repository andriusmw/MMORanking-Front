//import { Record } from "./Record";
import { Link } from "react-router-dom";

export const RecordList = ({ records }) => {
  return records.length ? (
    <table class="ladder-table">
      <thead>
        <tr>
          <th>Char.Name</th>
          <th>Class</th>
          <th>Dungeon</th>
          <th>Difficulty</th>
          <th>time</th>
          <th>Players</th>
          <th>Server</th>
          <th>Date</th>
          <th>Details</th>
     
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{record.character_name}</td>
            <td>{record.class1}</td>
            <td>{record.dungeon_name}</td>
            <td>{record.difficulty}</td>
          
            <td>{record.time}</td>
            <td>{record.num_players}</td>
            <td>{record.server}</td>
            <td>{new Date(record.Date_completed).toLocaleDateString()}</td>
            <td>
                <Link to={`/record/${record.id}`}>
                  <img width="30" height="30" src="/images/icons8-plus-30.png"  alt="plus--v1"/>
               </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>There are no records</p>
  );
};
