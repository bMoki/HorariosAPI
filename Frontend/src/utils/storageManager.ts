import { toast } from "react-toastify";

export const Toast = () => {
    if (sessionStorage.getItem("response")) {
        const resString = sessionStorage.getItem("response");
        const res = JSON.parse(resString!);
        console.log(res.response);
        if (res.status >= 400) {
            toast.error(res.data.message);
        } else {
            toast.success(res.data.message)
        }
        sessionStorage.removeItem("response");
    }
}



