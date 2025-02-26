import { ErrorMessage } from "../components/ErrorMessage";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import swal from "sweetalert";
import { createRecordService } from "../services";

export const NewRecordPage = () => {
   
   const { token, user, setUser, logout } = useContext(AuthContext); // Asegúrate de que setUser esté disponible en el contexto
   const [error, setError] = useState("");
   const [sending, setSending] = useState(false);
   const [logURL, setLogURL] = useState("");
   const [selectedCharacter, setSelectedCharacter] = useState('');
   const [isLoading, setIsLoading] = useState(false); // Estado para el spinner


 //--------------------- FUNCTION TO CREATE A NEW RECORD ------------------------------------
 const CreateRecord = async (e) => {
    e.preventDefault();
    setError("");
    let idUser = user?.user?.id;

    // Parsear el valor seleccionado de JSON a objeto
    const characterData = selectedCharacter ? JSON.parse(selectedCharacter) : null;

    try {
      setSending(true);
      setIsLoading(true); // Mostrar spinner
      const data = new FormData();
      data.append("user_id", idUser);
      data.append("character_id", characterData?.id || '');
      data.append("character_name", characterData?.name || '');
      data.append("character_class", characterData.classFront || '');
      data.append("character_server",characterData?.server || '');
      data.append("log_link", logURL);

      console.log({
        user_id: idUser,
        character_id: characterData?.id,
        character_name: characterData?.name,
      });

      // Aquí iría tu llamada al backend
          // Llamar al servicio para actualizar los datos del usuario
    const CreateRecordS = await createRecordService( {data, token });


 // LIMPIA EL ESTADO 
    setError("");
    setLogURL("");
    setSelectedCharacter("")
 
   

  } catch (error) {
    swal(`Error`, `${error.message}`, `error`);
    setError(error.message);
  } finally {
    setSending(false);
    setIsLoading(false); // Ocultar spinner
  }
};

//-------------------------------------------------------------------


   
  
  return <section>
    
    
        {user?.user ? (
          <>
          
            <form onSubmit={CreateRecord} className="editform">
              <h1 className="edith1">UPLOAD A NEW RECORD!</h1>
           
             <fieldset>
                <label htmlFor="character">Select Character: </label>
                <select
                  id="character"
                  name="character"
                  value={selectedCharacter}
                  onChange={(e) => setSelectedCharacter(e.target.value)}
                  disabled={isLoading} // Deshabilitar inputs durante carga
                >
              <option value="">-- Select a character --</option>
                {user.characters.map((character) => (
              <option
                key={character.id}
                value={JSON.stringify({ id: character.id, name: character.name, classFront: character.class1, server:character.server })}
               >
                {character.name} {character.class1} {character.server}
              </option>
                ))}
              </select>
            </fieldset>


              <fieldset>
                <label htmlFor="logURL">WARCRAFT LOGS URL HERE: </label>
                <input
                  type="text"
                  id="logURL"
                  name="logURL"
                  value={logURL}
                  onChange={(e) => setLogURL(e.target.value)}
                  disabled={isLoading} // Deshabilitar inputs durante carga
                />
              </fieldset>

              
               
                
              
            
            
         
              <button type="submit"  disabled={isLoading} >
                   {isLoading ? 'Sending...' : '  Send Record!'}
               </button>
              {sending ? <p>Sending New data for post</p> : null}
              {error ? <p>{error}</p> : null }
            </form>
            
            {isLoading && (
              <div className="spinner-overlay">
                 <div className="spinner"></div>
             </div>
            )}
            </>
          ) : <p>User not logged in</p>}
      

     
    </section> 
} 