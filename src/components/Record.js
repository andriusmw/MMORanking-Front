export const Record = ({record}) => {
    return (
        <article>
            
            <button>Go back</button>
            
            <p>Character Name: {record.character_name}</p>
            <p>Class: {record.class1}</p>
            <p>Spec: {record.class2}</p>
            <p>Server: {record.server}</p>
            <p>Dungeon Name: {record.dungeon_name}</p>
            <p>Difficulty: {record.difficulty}</p>
            <p>Season: {record.season}</p>
            <p>Time: {record.time}</p>
            <p>DATE: {record.Date_completed}</p>
            <p>Num.Players: {record.num_players}</p>
            <p>Log Link: {record.log_link}</p>
            <p>Video Link: {record.video_link}</p>
            <p>Status:  {record.status}</p>

            <button>Aprove</button>
            <button>Delete</button>
        </article>
    ) 
}