import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext();

export const AuthProviderComponent = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    //useEffect to make sure we don't loose the token of the user when browser is reloaded
    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token])

    useEffect(() => {
        const getUserData = async () => {
             try {
                const data = await getMyUserDataService({token})
                setUser(data);
             } catch(error) {
                console.log(error)
                logout();
             }
        }


        if(token) {
            getUserData()
        }
    }, [token])

    const login = (token) => {
        setToken(token);
    }


    const logout = () => {
      setToken('');
      setUser(null);  
    }


    return (
    <AuthContext.Provider value={{token, user, setUser, login, logout}}>
        {children}
    </AuthContext.Provider>
    );
};