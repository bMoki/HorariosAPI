
import axios from "axios";

let myStorage = window.sessionStorage;

export async function PostRequest(url:string,obg: object) {
    myStorage.setItem("toast", "POST");
    try {
        const res = await axios.post(`${url}`, obg);
        myStorage.setItem("postSuccess", '1');
        myStorage.setItem("res", res.data.message);
    } catch (err: any) {
        myStorage.setItem("postSuccess", '0');
        myStorage.setItem("errorMessage", err.response.data.message);
    }

    return true;

};

export async function PutRequest(url:string,obg: object,id:number) {
    myStorage.setItem("toast", "PUT");
    try {
        const res = await axios.put(`${url}/${id}`, obg);
        myStorage.setItem("putSuccess", '1');
        myStorage.setItem("res", res.data.message);
    } catch (err: any) {
        myStorage.setItem("putSuccess", '0');
        myStorage.setItem("errorMessage", err.response.data.message);
    }

    return true;
};

export async function DeleteRequest(url:string,id:number) {
    myStorage.setItem("toast", "DELETE");
    try {
        const res = await axios.delete(`${url}/${id}`);
        myStorage.setItem("deleteSuccess", '1');
        myStorage.setItem("res", res.data.message);
    } catch (err: any) {
        myStorage.setItem("deleteSuccess", '0');
        myStorage.setItem("errorMessage", err.response.data.message);
    }

    return true;
};