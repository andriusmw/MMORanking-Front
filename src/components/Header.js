import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { NavBar } from "./NavBar";

export const Header = () => {
    const { token, user, logout } = useContext(AuthContext);

    return (
        <header>
            <h1><Link to={'/'}>Speed Run Dungeons</Link></h1>
            <div className="header-right">
               
                <NavBar />
                <Auth />
            </div>
        </header>
    );
};