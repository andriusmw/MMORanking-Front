import { createContext, useEffect, useState, useCallback } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [regionAuth, setRegionAuth] = useState(null); // Renombrado de region a regionAuth

  // Sincronizar token con localStorage
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // Cargar userId y regionAuth desde localStorage al montar el componente o cuando cambie el token
  useEffect(() => {
    const loadSessionData = () => {
      const sessionIdentifier = localStorage.getItem("sessionIdentifier");
     // console.log("Loading session data with sessionIdentifier:", sessionIdentifier);
      if (sessionIdentifier) {
        const sessionData = JSON.parse(localStorage.getItem(`sessionData_${sessionIdentifier}`));
       // console.log("Session data loaded:", sessionData);
        if (sessionData) {
          setUserId(sessionData.userId);
          setRegionAuth(sessionData.regionAuth); // Renombrado
        } else {
          console.warn("No session data found for sessionIdentifier:", sessionIdentifier);
          setUserId(null);
          setRegionAuth(null); // Renombrado
        }
      } else {
        console.warn("No sessionIdentifier found in localStorage");
        setUserId(null);
        setRegionAuth(null); // Renombrado
      }
    };

    loadSessionData();
  }, [token]);

  const refreshUserData = useCallback(async () => {
    if (!token) return;
    try {
      const data = await getMyUserDataService({ token });
      if (data?.user?.locked_until && data.user.locked_until !== null) {
        console.log("User is banned until", data.user.locked_until);
        logout();
        return;
      }
      setUser((prevUser) => {
        if (JSON.stringify(prevUser) !== JSON.stringify(data)) {
          console.log("User data refreshed:", data);
          return data;
        }
        return prevUser;
      });
    } catch (error) {
      console.log("Error refreshing user data:", error.message);
      logout();
    }
  }, [token]);

  useEffect(() => {
    if (token && !user) {
      refreshUserData();
    }
  }, [token, user, refreshUserData]);

  const login = async (newToken, userId, regionAuth) => { // Renombrado el parámetro
    console.log("Calling login with:", { newToken, userId, regionAuth });
    try {
      const data = await getMyUserDataService({ token: newToken });
      if (data?.user?.locked_until && data.user.locked_until !== null) {
        console.log("Login blocked: User is banned until", data.user.locked_until);
        setToken("");
        throw new Error("Cannot login: User is banned");
      }

      // Generar un sessionIdentifier único
      const sessionIdentifier = crypto.randomUUID();
      localStorage.setItem("sessionIdentifier", sessionIdentifier);

      // Almacenar userId y regionAuth en localStorage
      const sessionData = { userId, regionAuth }; // Renombrado
      localStorage.setItem(`sessionData_${sessionIdentifier}`, JSON.stringify(sessionData));
      console.log("Session data saved to localStorage:", sessionData);

      // Actualizar el estado
      setToken(newToken);
      setUser(data);
      setUserId(userId);
      setRegionAuth(regionAuth); // Renombrado
    } catch (error) {
      console.log("Login error:", error.message);
      setToken("");
      setUser(null);
      setUserId(null);
      setRegionAuth(null); // Renombrado
      throw error;
    }
  };

  const logout = () => {
    console.log("Logging out");
    // Limpiar localStorage
    const sessionIdentifier = localStorage.getItem("sessionIdentifier");
    if (sessionIdentifier) {
      localStorage.removeItem(`sessionData_${sessionIdentifier}`);
      localStorage.removeItem("sessionIdentifier");
    }
    localStorage.removeItem("token");

    // Limpiar el estado
    setToken("");
    setUser(null);
    setUserId(null);
    setRegionAuth(null); // Renombrado
  };

  return (
    <AuthContext.Provider
      value={{ token, user, setUser, userId, regionAuth, login, logout, refreshUserData }} // Renombrado
    >
      {children}
    </AuthContext.Provider>
  );
};