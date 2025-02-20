import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const Header = () => {
    const {token, user, logout} = useContext(AuthContext);

    return (
        <header>
            <h1> <Link to={'/'}>Speed Run Dungeons</Link> </h1>
            <nav>
                <Auth />
                <navBar>
                  <span><Link to={'/'}>Home</Link></span> 
                  <span><Link to={'/news'}>News</Link></span> 
                  <span><Link to={'/ladders'}>Ladders</Link></span>
                  <span><Link to={'/newrecord'}>New Record</Link></span>
                  <span><Link to={'/profile'}>Profile</Link></span>
                  <span><Link to={'/stats'}>Stats</Link></span>
                  <span><Link to={'/contact'}>Contact</Link></span>
                
               {  user?.user?.role == "admin" ? <span><Link to={'/admin-panel'}>Admin Panel</Link></span> : null}
                </navBar>
            </nav>
        </header>
    );
};