import axios from "axios";
import { LoginContext } from "contexts/LoginContext";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { User } from "types/user";

const BASE_URL = 'http://localhost:8080';

async function checkToken(user: User | undefined) {
    if (user?.exp !== undefined) {
        if (Date.now() >= user.exp * 1000) {
            return true;
        }
        return false;
    }
    return true;
}



const useApi = () => {
    const { user, setUser, setAuthTokens, authTokens, handleLogout } = useContext(LoginContext)

    const axiosInstance = axios.create({
        baseURL: BASE_URL
    })

    const refresh = async () => {
        try {
            return await axios.get(`${BASE_URL}/usuario/token/refresh`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(authTokens!).refresh_token}`
                }
            });
        } catch (err: any) {
            return err;
        }
    }


    axiosInstance.interceptors.request.use(async req => {

        const isExpired = await checkToken(user);
        if (isExpired === false) {
            req.headers.Authorization = `Bearer ${JSON.parse(authTokens!).access_token}`
            return req
        };

        const response = await refresh();

        if (response.status !== 200) {
            console.clear();
            handleLogout!(true);
            throw new axios.Cancel('Not Authorized');
        }

        localStorage.setItem('tokens', JSON.stringify(response.data));

        setAuthTokens!(JSON.stringify(response.data))
        setUser!(jwtDecode(response.data.access_token))

        req.headers.Authorization = `Bearer ${response.data.access_token}`


        return req
    });

    axiosInstance.interceptors.response.use(function (response) {
        if (response.config.method !== "get") {
            sessionStorage.setItem("response", JSON.stringify(response));
            window.location.reload();
        }
        return response;
    }, function (error) {
        if (error.config.method !== "get") {
            sessionStorage.setItem("response", JSON.stringify(error.response));
            window.location.reload();
        }
        return Promise.reject(error);

    });

    return axiosInstance
}

export default useApi;