import { useNavigate } from "react-router-dom";
import { deletePostService } from "../services";
import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert";


export const SingleArticle = ({ article }) => {
    const { token, user, setUser, logout } = useContext(AuthContext); // Asegúrate de que setUser esté disponible en el contexto
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
       <button onClick={handleGoBack} className="go-back-button">Go back</button>
        <article className="single-article"> {/* Add class single-article to the article element */}
           
            
            <h1>{article.title}</h1> {/* Changed p to h1 for semantic heading */}
            <p>{article.text}</p>

            {article.image ? (
                <img
                    src={`${process.env.REACT_APP_BACKEND}/uploads/${article.image}`}
                    alt={article.title}
                />
            ) : null}

           
            <p className="metadata">{new Date(article.created_at).toLocaleDateString()} by {article.user_name}</p>
         
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