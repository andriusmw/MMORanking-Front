import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProviderComponent = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    //useEffect to make sure we don't loose the token of the user when browser is reloaded
    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token])

    return (
    <AuthContext.Provider value={{token, setToken}}>
        {children}
    </AuthContext.Provider>
    );
};