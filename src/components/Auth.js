import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
    const { token, user, logout } = useContext(AuthContext);

    return (
        <div className="auth">
            {user ? (
                <>
                    <span>Welcome, <Link to="/profile">{user?.user?.name || "User"}</Link></span>
                    <button onClick={() => logout()}>Logout</button>
                </>
            ) : (
                <ul className="auth-list">
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};