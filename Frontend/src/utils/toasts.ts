import { toast } from "react-toastify";

const Toast = ()=>{
    let myStorage = window.sessionStorage;

    if (myStorage.getItem("toast")) {
        switch (myStorage.getItem("toast")) {
            case "POST":
    
                if (myStorage.getItem("postSuccess") === '1') {
                    toast.success(myStorage.getItem("res"));
                    myStorage.removeItem("res");
    
                } else {
                    if (myStorage.getItem("postSuccess") === '0') {
                        toast.error(myStorage.getItem("errorMessage"));
                        myStorage.removeItem("errorMessage");
                    }
                }
    
                myStorage.removeItem("postSuccess");
                break;
    
            case "PUT":
    
                if (myStorage.getItem("putSuccess") === '1') {
                    toast.success(myStorage.getItem("res"));
                    myStorage.removeItem("res");
                } else {
                    if (myStorage.getItem("putSuccess") === '0') {
                        toast.error("Ocorreu um erro " + myStorage.getItem("errorMessage"));
                        myStorage.removeItem("errorMessage");
                    }
                }
    
                myStorage.removeItem("putSuccess");
                break;
    
            case "DELETE":
    
                if (myStorage.getItem("deleteSuccess") === '1') {
                    toast.success(myStorage.getItem("res"));
                    myStorage.removeItem("res");
                } else {
                    if (myStorage.getItem("deleteSuccess") === '0') {
                        toast.error("Ocorreu um erro " + myStorage.getItem("errorMessage"));
                        myStorage.removeItem("errorMessage");
                    }
                }
    
                myStorage.removeItem("deleteSuccess");
                break;
            default:
    
        }
        myStorage.removeItem("toast");
    
    }
}
export default Toast;
