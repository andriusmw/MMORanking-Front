import { useNavigate } from "react-router-dom";
import { deletePostService } from "../services";
import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert";
import SocialShareButtons from "./SocialShareButtons";


export const SingleArticle = ({ article }) => {

     // URL base de tu sitio más el ID de la noticia (ajusta según tu estructura)
  const newsUrl = `${window.location.origin}/news/${article.id}`;

    const { token, user, setUser, logout } = useContext(AuthContext); // Asegúrate de que setUser esté disponible en el contexto
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const getYouTubeEmbedUrl = (url) => {
        // Expresión regular para extraer el ID del video
        const videoIdMatch = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
      };
    
      // Obtener la URL de embed a partir de video_link
      const embedUrl = article?.video_link ? getYouTubeEmbedUrl(article.video_link) : null;




    const handleGoBack = () => {
      navigate(-1); // Esto es equivalente a "volver atrás" en el historial del navegador
    };

    //---------------------------------FUNCTION: DELETE POST -------------------------
    const deletePost = async (id) => {
      try {
          let idNew = id;
          await deletePostService({ idNew, token });
          navigate("/news"); 
      } catch (error) {
          setError(error.message);
      } 
    };

    return (
      <>
       <button className="submit-button news-button button-goBackNew" onClick={handleGoBack} >Go back</button>
        <article className="single-article"> 
           
            
            <h1>{article.title}</h1> 
            <p className="news-content">{article.text}</p>

            {article.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${article.image}`}
                    alt={article.title}
                />
            ) : null}

<div className="news-video-div">
      
      {embedUrl ? (
        <iframe className="news-video"
          width="560"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No se pudo cargar el video. Verifica la URL.</p>
      )}
    </div>

            <p className="metadata">{new Date(article.created_at).toLocaleDateString()} by {article.user_name}</p>


            <SocialShareButtons title={article.title} url={newsUrl} />
         
            {/*LOAD DELETE BUTTON */}
            {user?.user && (user?.user?.role === "admin" || user?.user?.role === "mod") ? (
                <section>
                    <button onClick={() => deletePost(article.id)} className="delete-button">Delete POST</button>
                    {error && <p className="error-message">{error}</p>}
                </section>
            ) : null}
        </article>
        </>
    );
};