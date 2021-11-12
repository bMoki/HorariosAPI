import useAuth from "hooks/useAuth";
import React, { createContext, FC } from "react";
import { User } from "types/user";

interface ILoginContext {
    handleLogin?: (username: string, password: string, history: any) => void,
    handleLogout?: () => void,
    authenticated: boolean,
    loading: boolean,
    user: User | undefined,
    authTokens: string | null,
    setAuthTokens?: (React.Dispatch<React.SetStateAction<string | null>>),
    setUser?: (React.Dispatch<React.SetStateAction<User | undefined>>),
}

export const LoginContext = createContext<ILoginContext>({
    authenticated: false,
    loading: true,
    user: undefined,
    authTokens: null,
  
});

const LoginContextProvider: FC = ({ children }) => {

  
    const {
        authenticated, loading, handleLogin, handleLogout, user, authTokens, setAuthTokens, setUser
    } = useAuth();




    return (
        <LoginContext.Provider value={{
            handleLogin, handleLogout, authenticated, loading, user, authTokens, setAuthTokens, setUser
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;