import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "types/user";


export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false),
        [loading, setLoading] = useState(true),
        [user, setUser] = useState<User | undefined>(undefined),
        [authTokens, setAuthTokens] = useState<string | null>(() => localStorage.getItem('tokens') ? localStorage.getItem('tokens') : null)





    async function handleLogin(username: string, password: string, history: any) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }



        async function Login() {
            try {
                const res = await axios.post(`http://localhost:8080/login`, params, config);
                return res;
            } catch (err: any) {
                return err;
            }

        }

        const data = await Login();
        if (data.status === 200) {
            setAuthTokens(JSON.stringify(data.data));
            setAuthenticated(true);
            const decoded = jwtDecode(data.data.access_token) as User;
            setUser(decoded);
            localStorage.setItem('tokens', JSON.stringify(data.data));
            history.push('/');
        } else {
            toast.error("Erro no login");
        }
    }

    function LogOut() {
        sessionStorage.setItem("logout", "Você saiu!");
        handleLogout(false);
    }

    function handleLogout(exp: boolean) {
        if (exp) { sessionStorage.setItem("logout", "Login expirado!") };
        setAuthenticated(false);
        setAuthTokens(null);
        setUser(undefined);
        localStorage.removeItem('tokens');
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(JSON.parse(authTokens).access_token));
            setAuthenticated(true);
        }
        setLoading(false)


    }, [authTokens, loading])




    return { authenticated, loading, handleLogin, handleLogout, user, authTokens, setAuthTokens, setUser, LogOut }
}