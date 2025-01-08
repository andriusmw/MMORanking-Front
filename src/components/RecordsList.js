import { Record } from "./Record";

export const RecordList = ({records}) => {
    return records.length ? (
    <ul>
      {records.map(record => (
        <li key={record.id}>
            <Record record={record}/>
            </li>
            ))}
    </ul>
    ): (
        <p>There are no records</p>
    ) ;
};