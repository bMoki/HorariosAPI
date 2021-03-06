import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "types/user";
import { BASE_URL } from "utils/BASE_URL";


export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false),
        [loading, setLoading] = useState(true),
        [user, setUser] = useState<User | undefined>(undefined),
        [authTokens, setAuthTokens] = useState<string | null>(() => localStorage.getItem('tokens') ? localStorage.getItem('tokens') : null),
        [loadingSubmit, setLoadingSubmit] = useState(false);



    async function handleLogin(username: string, password: string, history: any) {
        setLoadingSubmit(true);
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
                const res = await axios.post(`${BASE_URL}/login`, params, config);
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
            sessionStorage.setItem('login', `Bem vindo!`)
            history.push('/');

        } else {
            toast.error("Erro no login");
        }
        setLoadingSubmit(false);
    }

    function LogOut() {
        sessionStorage.setItem("logout", "Você saiu!");
        handleLogout();
    }

    function handleLogout() {
        setAuthenticated(false);
        setAuthTokens(null);
        setUser(undefined);
        localStorage.removeItem('tokens');
        sessionStorage.removeItem('response');
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(JSON.parse(authTokens).access_token));
            setAuthenticated(true);
        }
        setLoading(false)


    }, [authTokens, loading])




    return { authenticated, loading, handleLogin, handleLogout, user, authTokens, setAuthTokens, setUser, LogOut,loadingSubmit,setLoadingSubmit }
}