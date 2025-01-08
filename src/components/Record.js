export const Record = ({record}) => {
    return (
        <article>
      
            <p>{record.character_name}</p>
            <p>{record.class1}</p>
            <p>{record.server}</p>
            <p>{record.dungeon_name}</p>
            <p>{record.dungeon_difficulty}</p>
            <p>{record.dungeon_season}</p>
            <p>{record.time}</p>
            <p>{record.num_players}</p>
            <p>{record.log_link}</p>
            <p>{record.status}</p>
        </article>
    ) 
}