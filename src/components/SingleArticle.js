import { useNavigate } from "react-router-dom";
import { deletePostService } from "../services";
import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert";

export const SingleArticle = ({article}) => {
    const { token, user, setUser, logout } = useContext(AuthContext); // Asegúrate de que setUser esté disponible en el contexto
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Esto es equivalente a "volver atrás" en el historial del navegador
    };


     //---------------------------------FUNCTION: DELETE POST -------------------------
  const deletePost = async (id) => {
    try {
        let idNew = id
      //primero lo borra usando el service
      await deletePostService({idNew, token})
        /*
      //removeEntry lo quita del estado de entries
     if(removePost) {
      removePost(id);
     
      
     }  else {
      navigate("/news"); 
    
     }
    */
     navigate("/news"); 
    } catch (error) {
      setError(error.message)

    } 


}

















    return (
        <article>
            
            <button onClick={handleGoBack}>Go back</button>
            
            <p>{article.title}</p>
            <p>{article.text}</p>

            <p>{article.image}</p>

            {article.image ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${article.image}`}
          alt={article.image}
        />
      ) : null}


            <p>{article.created_at}</p>
            <p>{article.user_name}</p>
         
        {/*LOAD DELETE BUTTON */}
        {user?.user && (user?.user?.role === "admin" || user?.user?.role === "mod") ? (
        <section>
          <button onClick={() => deletePost(article.id)} >Delete POST</button>
          {error ? <p>{error} </p> : null }
        </section>
        ) : null}
          
        </article>
    ) 
}