import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const NavBar = () => {
    const {token, user, logout} = useContext(AuthContext);

    return (
        <nav>
              <span><Link to={'/'}>Home</Link></span> 
                  <span><Link to={'/news'}>News</Link></span> 
                  <span><Link to={'/ladders'}>Ladders</Link></span>
                  <span><Link to={'/newrecord'}>New Record</Link></span>
                  <span><Link to={'/profile'}>Profile</Link></span>
                  <span><Link to={'/stats'}>Stats</Link></span>
                  <span><Link to={'/contact'}>Contact</Link></span>
                
               {  user?.user?.role == "admin" ? <span><Link to={'/admin-panel'}>Admin Panel</Link></span> : null}
        </nav>
    )
}