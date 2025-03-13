import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert";
import SocialShareButtons from "./SocialShareButtons";

export const Record = ({record}) => {

    // URL base de tu sitio más el ID de la noticia (ajusta según tu estructura)
    const newsUrl = `${window.location.origin}/record/${record.id}`;

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Esto es equivalente a "volver atrás" en el historial del navegador
    };


    return (
        <article className="single-article">
            
            <button className="submit-button news-button" onClick={handleGoBack} >Go back</button>
            
            <p className="record-text"> <b>Record id:</b> {record.id}</p>
            <p className="record-text"> <b>Character Name:</b> {record.character_name}</p>
            <p className="record-text"><b>Class:</b> {record.class1}</p>
            <p className="record-text"><b>Spec:</b> {record.class2}</p>
            <p className="record-text"><b>Server:</b> {record.server}</p>
            <p className="record-text"><b>Dungeon Name:</b> {record.dungeon_name}</p>
            <p className="record-text"><b>Difficulty:</b> {record.difficulty}</p>
            <p className="record-text"><b>Season:</b> {record.season}</p>
            <p className="record-text"><b>Time:</b> {record.time}</p>
            <p className="record-text"><b>DATE: </b> {new Date(record.Date_completed).toLocaleDateString()}</p>
           
            <p className="record-text"><b>Num.Players:</b> {record.num_players}</p>
            <p className="record-text"><b>Log Link:</b> </p>   
            <p className="record-text"> <b>
                <a className="record-link" href={record.log_link} target="_blank" rel="noopener noreferrer">
                    {record.log_link}
                 </a></b>
            </p>

            
     


            <SocialShareButtons title={`NEW RECORD! by: ${record.character_name}`} url={newsUrl} />
         
            {/* for future implementations
            <p className="record-text">Video Link: {record.video_link}</p>
            <p className="record-text">Status:  {record.status}</p>
            <button>Aprove</button>
            <button>Delete</button> */}
           
        </article>
    ) 
}