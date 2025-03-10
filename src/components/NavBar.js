import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

export const NavBar = () => {
    const { token, user, logout } = useContext(AuthContext);
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className="navbar">
            <ul className={`nav-list ${isActive ? "active" : ""}`}>
                <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              
                <li><Link to="/news" onClick={toggleMenu}>News</Link></li>
                <li><Link to="/ladders" onClick={toggleMenu}>Ladders</Link></li>
                <li><Link to="/newrecord" onClick={toggleMenu}>New Record</Link></li>
                <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
                <li><Link to="/stats" onClick={toggleMenu}>Stats</Link></li>
                <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                {user?.user?.role === "admin" && (
                    <li><Link to="/admin-panel" onClick={toggleMenu}>A.P.</Link></li>
                )}
            </ul>
            <div
                className={`burger-menu ${isActive ? "active" : ""}`}
                onClick={toggleMenu}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
};