import { createContext, useEffect, useState, useCallback } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  // Sincronizar token con localStorage
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Hacer refreshUserData estable con useCallback
  const refreshUserData = useCallback(async () => {
    if (!token) return;
    //console.log("Calling refreshUserData"); // Log para depurar
    try {
      const data = await getMyUserDataService({ token });
      //console.log("Data from getMyUserDataService:", data);
      if (data?.user?.locked_until && data.user.locked_until !== null) {
        console.log("User is banned until", data.user.locked_until);
        logout();
        return;
      }
      // Solo actualizar user si es diferente (evitar rerenderizados innecesarios)
      setUser((prevUser) => {
        if (JSON.stringify(prevUser) !== JSON.stringify(data)) {
          return data;
        }
        return prevUser;
      });
    } catch (error) {
      console.log("Error refreshing user data:", error.message);
      logout();
    }
  }, [token]); // Dependencia: token

  // Ejecutar refreshUserData solo al montar inicialmente si hay token y no hay user
  useEffect(() => {
    if (token && !user) {
     // console.log("Initial refresh triggered");
      refreshUserData();
    }
  }, [token, user, refreshUserData]);

  const login = async (newToken) => {
    console.log("Calling login");
    try {
      const data = await getMyUserDataService({ token: newToken });
      if (data?.user?.locked_until && data.user.locked_until !== null) {
        console.log("Login blocked: User is banned until", data.user.locked_until);
        setToken("");
        throw new Error("Cannot login: User is banned");
      }
      setToken(newToken);
      setUser(data);
    } catch (error) {
      console.log("Login error:", error.message);
      setToken("");
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    console.log("Logging out");
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, logout, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};