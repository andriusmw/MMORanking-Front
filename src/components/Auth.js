import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { token, user, logout, refreshUserData } = useContext(AuthContext);

  // Refrescar datos del usuario solo al montar el componente por primera vez
  useEffect(() => {
    if (token) {
      refreshUserData(); // Verifica el estado al cargar la página
    }
  }, [token, refreshUserData]); // Dependencias: token y refreshUserData

  return (
    <div className="auth">
      {user ? (
        user.user.locked_until && user.user.locked_until !== null ? (
          <p>You are banned until {new Date(user.user.locked_until).toLocaleString()}</p>
        ) : (
          <>
            <span>
              Welcome, <Link to="/profile">{user?.user?.name || "User"}</Link>
            </span>
            <button id="logout" onClick={() => logout()}>
              Logout
            </button>
          </>
        )
      ) : (
        <ul className="auth-list">
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
};