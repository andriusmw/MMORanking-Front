import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
    const {token, user, logout} = useContext(AuthContext);

    return (
        /*is user.user.name cause user is the object that saves the response and the response is an object with properties
        "characters" and "user" where is the user profile data. */
    user ? (
        <p>Wellcome 
         <Link to={'/profile'}>{user?.user?.name}</Link>  
         <button onClick={()=>logout()}>logOut</button> 
        </p>
    
    )  : (
    <ul>
        <li><Link to={'/register'}>Register</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
       
    </ul>
       )
    );
};