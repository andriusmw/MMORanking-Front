import { ErrorMessage } from "../components/ErrorMessage";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { CharacterList } from "../components/CharacterList";

export const ProfilePage = () => {
     const {token, user, logout} = useContext(AuthContext);

  
  return <section>

    {user ? (
        <>
        <h3>My profile page!</h3>

        <p>Avatar: {user?.user?.avatar}</p>
        <p>Name:{user?.user?.name} </p>
        <p>Email: {user?.user?.email}</p>
        <p>Password: Hidden </p> <Link to={'/changepass'}>Do you wish to change it?</Link>
        <p>Role: {user?.user?.role}</p>
        <p>Biography:{user?.user?.bio}</p>
        <p>Region:{user?.user?.region}</p>
        <p>BattleTag:{user?.user?.battle_tag}</p>
        <p>Warcraft Logs Username:{user?.user?.wl_username}</p>

         <h2>My Characters!</h2>
         
            <CharacterList characters={user?.characters} /> 


        </>

    ) : (
        <p>user not logged</p>
    )}
       

    </section> 
} 