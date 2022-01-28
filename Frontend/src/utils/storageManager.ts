import { toast } from "react-toastify";

export const Toast = () => {
    if (sessionStorage.getItem("response")) {
        const resString = sessionStorage.getItem("response");
        const res = JSON.parse(resString!);
        if (res.status >= 400) {
            if(res.data.message){
                toast.error(res.data.message);
            }else{
                toast.error("Erro, verifique e tente novamente!");
            }
            
        } else {
            if(res.data.warning){
                toast.warn(res.data.warning);
            }
            if(res.data.message){
                toast.success(res.data.message)
            }
            
        }
        if(res.data.inseridas === undefined){
            sessionStorage.removeItem("response");
        }   
    }

    if (sessionStorage.getItem("logout")) {
        const res = sessionStorage.getItem("logout");
        toast.info(res);
        sessionStorage.removeItem("logout");
    }

    if (sessionStorage.getItem("login")) {
        const res = sessionStorage.getItem("login");
        toast.success(res);
        sessionStorage.removeItem("login");
    }
}



