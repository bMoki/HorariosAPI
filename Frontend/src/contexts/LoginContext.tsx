import useAuth from "hooks/useAuth";
import React, { createContext, FC } from "react";
import { User } from "types/user";

interface ILoginContext {
    handleLogin?: (username: string, password: string, history: any) => void,
    handleLogout?: (exp: boolean) => void,
    LogOut?: () => void,
    authenticated: boolean,
    loading: boolean,
    user: User | undefined,
    authTokens: string | null,
    loadingSubmit:boolean,
    setAuthTokens?: (React.Dispatch<React.SetStateAction<string | null>>),
    setUser?: (React.Dispatch<React.SetStateAction<User | undefined>>),
    setLoadingSubmit?:(React.Dispatch<React.SetStateAction<boolean>>),
}

export const LoginContext = createContext<ILoginContext>({
    authenticated: false,
    loading: true,
    user: undefined,
    authTokens: null,
    loadingSubmit:false

});

const LoginContextProvider: FC = ({ children }) => {


    const {
        authenticated, loading, handleLogin, handleLogout, user, authTokens, setAuthTokens, setUser, LogOut,loadingSubmit,setLoadingSubmit
    } = useAuth();

   

    return (
        <LoginContext.Provider value={{
            handleLogin, handleLogout, authenticated, loading, user, authTokens, setAuthTokens, setUser, LogOut,setLoadingSubmit,loadingSubmit
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;