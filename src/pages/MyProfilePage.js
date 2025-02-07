import { ErrorMessage } from "../components/ErrorMessage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { CharacterList } from "../components/CharacterList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import swal from "sweetalert"
import { editUserDataService } from "../services";

export const ProfilePage = () => {
     const {token, user, logout} = useContext(AuthContext);
     const [error, setError] = useState("");
     const navigate = useNavigate();
     //estado visibilidad formulario editar
     const [visible, setVisible] = useState(false)
     const [sending, setSending] = useState(false);
     //CREAMOS ESTADOS DE LOS CAMPOS DE LA ENTRADA
     const [userName, setUserName] = useState("");
     const [userEmail, setUserEmail] = useState("");
     let imageInputRef = useRef();  //para la imagen
     const [biography, setBiography] = useState("");
     const [region, setRegion] = useState("");
     const [wlUsername, setWlUsername] = useState("");
     //estado preview photo
     const [previewPhoto, setPreviewPhoto] = useState("");



 //*-------------------------------FUNCION EDIT ENTRY ------------------------------

 const EditEntry = async (e) => {
    e.preventDefault();
   let idUser = user?.user?.id

  

  //  console.log("title: "+ title);

    try{
        setSending(true);
  
      
        const data = new FormData();
        data.append("name", userName);
        data.append("email", userEmail);
       if (imageInputRef.current.files[0]) {data.append("image", imageInputRef.current.files[0]);}
        data.append("bio", biography);
        data.append("region", region);
        data.append("wl_username", wlUsername);
        console.log(data)
        const entry = await editUserDataService({idUser, data,token});
        
        console.log(entry);
        setError("");
        navigate(0);
    } catch (error) {
        console.log(error)
        console.log(error.message)
        swal(`Error`,`${error.message}`,`error` )
        setError(error.message);
    } finally {
        setSending(false);
    }
}





  
  return <section>

    {user ? (
        <>
        <div>
        <h2>My profile page!</h2>
  
          <div>
            <button onClick={() => { 
              setVisible(true)
               //SET ESTADOS para que aparezcan los campos rellenos en el form editar
               setUserName(user?.user?.name);
               setUserEmail(user?.user?.email);
               setBiography(user?.user?.bio);
               setRegion(user?.user?.region);
               setWlUsername(user?.user?.wl_username);
 
              }} >EDIT</button>
          </div>
    
        <button>Sync Characters</button>
        </div>

        <p>Avatar: {user?.user?.avatar}</p>
        {user?.user?.avatar ? (
        <img
          src={`${process.env.REACT_APP_BACKEND}/uploads/${user?.user?.avatar}`}
          alt={user?.user?.name}
        />
      ) : null}      



        <p>Name:{user?.user?.name} </p>
        <p>Email: {user?.user?.email}</p>
        <p>Password: Hidden </p> <Link to={'/changepass'}>Do you wish to change it?</Link>
        <p>Role: {user?.user?.role}</p>
        <p>Biography:{user?.user?.bio}</p>
        <p>Region:{user?.user?.region}</p>
        <p>BattleTag:{user?.user?.battle_tag}</p>
        <p>Warcraft Logs Username:{user?.user?.wl_username}</p>

         <h3>My Characters!</h3>
         
            <CharacterList characters={user?.characters} /> 




        {/*-----------------------------------------------FORMULARIO EDITAR -------------------------------------------------*/}
         {visible ? (
            <form onSubmit={EditEntry} className="editform">
            <h1 className="edith1"  >EDIT USER DATA</h1>
    
            <fieldset>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" name="username" defaultValue={userName} onChange={ (e)=> {setUserName(e.target.value)}} />
            </fieldset>
            <fieldset>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" defaultValue={userEmail} onChange={ (e)=> {setUserEmail(e.target.value)}} />
            </fieldset>    
            <fieldset>
                <label htmlFor="image">Image (optional): </label>
                <input type="file" id="image" name="image"  ref={imageInputRef}
                onChange={() =>  {setPreviewPhoto(URL.createObjectURL(imageInputRef.current.files[0]))}} />
                
                {previewPhoto ? (
                  //Carga la preview de la foto
                    <img
                      src={previewPhoto}
                      alt={user?.user?.name}
                    />
                ) :  <img
                       src={`${process.env.REACT_APP_BACKEND}/uploads/${user?.user?.avatar}`}
                       alt={user?.user?.name}
               />}
            </fieldset>
            <fieldset> 
                <label htmlFor="biography">Biography: </label>
                <input type="text" id="biography" name="biography" defaultValue={biography} onChange={ (e)=> {setBiography(e.target.value)}} />
           </fieldset>
           <fieldset>
                <label htmlFor="region">Region: </label>
                <input type="text" id="region" name="region" defaultValue={region} onChange={ (e)=> {setRegion(e.target.value)}} />
            </fieldset>    
            <fieldset>
                <label htmlFor="wlusername">Warcraft Log Username: </label>
                <input type="text" id="wlusername" name="wlusername" defaultValue={wlUsername} onChange={ (e)=> {setWlUsername(e.target.value)}} />
            </fieldset>
            
                <button>Send Entry</button>
                {sending ? <p>Sending New data for User</p> : null}
                {error ? <p>{error} </p> : null}
    
           
    
        </form>

        ) : null}


































        </>

    ) : (
        <p>user not logged</p>
    )}
       

    </section> 
} 