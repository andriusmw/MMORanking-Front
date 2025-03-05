import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRef } from "react";
import swal from "sweetalert";
import { createPostService } from "../services";

export const NewPostPage = () => {

   const { token, user, setUser, logout } = useContext(AuthContext); // Asegúrate de que setUser esté disponible en el contexto
   const [error, setError] = useState("");
   const [sending, setSending] = useState(false);

   const [title, setTitle] = useState("");
   const [preview, setPreview] = useState("");
   const [text, setText] = useState(""); 
   let imageInputRef = useRef();
   const [previewPhoto, setPreviewPhoto] = useState("");


 //--------------------- FUNCTION TO CREATE A NEW POST ------------------------------------
 const CreatePost = async (e) => {
  e.preventDefault(); // Evita el comportamiento predeterminado del formulario
  let idUser = user?.user?.id;
  let userName = user?.user?.name

  try {
    setSending(true);
    const data = new FormData();
    data.append("user_id", idUser);
    data.append("user_name", userName);
    data.append("title", title);
    data.append("preview", preview);
    data.append("text", text);
    if (imageInputRef.current.files[0]) {
      data.append("image", imageInputRef.current.files[0]);
    }
   

    // Llamar al servicio para actualizar los datos del usuario
    const CreatePostS = await createPostService( {data, token });


    setError("");
     // LIMPIA EL ESTADO 
    setTitle("");
    setPreview("");
    setText("");
    setPreviewPhoto("");
    imageInputRef.current.value = null; // Esto limpia el input de archivo

  } catch (error) {
    swal(`Error`, `${error.message}`, `error`);
    setError(error.message);
  } finally {
    setSending(false);
  }
};

//-------------------------------------------------------------------


   
  
  return <section>
    
    
        {user?.user?.role == "mod" || user?.user?.role == "admin" ? (
          <>
            <section className="form-section editform" onSubmit={CreatePost} >
              <h1 className="edith1">CREATE A NEW POST!</h1>
              <form  className="form-container">
              <fieldset className="form-fieldset">
                <label htmlFor="title">Titlte: </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-fieldset">
                <label htmlFor="preview">Preview: </label>
                <input
                  type="text"
                  id="preview"
                  name="preview"
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                />
              </fieldset>

              <fieldset className="form-fieldset">
              <label htmlFor="text" className="form-label">Text:</label>
              <textarea id="text" name="text" rows="50" className="form-textarea" value={text} onChange={(e) => setText(e.target.value)}></textarea>
             
               
              </fieldset>


              <fieldset className="form-fieldset">
                <label htmlFor="image">Image (optional): </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  ref={imageInputRef}
                  onChange={() =>
                    setPreviewPhoto(
                      imageInputRef.current.files[0] ? URL.createObjectURL(imageInputRef.current.files[0]) : ""
                    )
                  }
                />
               
                
              
              </fieldset>
            
         
              <button type="submit" className="submit-button">Send Post</button>
              {sending ? <p>Sending New data for post</p> : null}
              {error ? <p>{error}</p> : null }
              </form>
            </section>
            </>
          ) : <p>Not an admin or mod</p>}
      

     
    </section> 
} 