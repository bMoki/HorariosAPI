import axios from "axios";
import { createContext, useState } from "react";
import { BASE_URL } from "utils/requests";
import { mask } from "remask";
import { toast } from "react-toastify";


export const ProfessorContext = createContext();

export function ProfessorContextProvider({ children }) {

    var myStorage = window.sessionStorage;


    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [siape, setSiape] = useState("");
    const [id, setId] = useState(0);
    const [btnOperation, setBtnOperation] = useState(false);
    const [formIsOk, setFormIsOk] = useState(true);



    function FormValidation() {
        var Ok = true;

        if (nome === "") {
            Ok = false;
        }

        if (cpf.length < 14) {
            Ok = false;
        }

        if (sobrenome === "") {
            Ok = false;
        }

        if (email === "") {
            Ok = false;
        }

        if (dataNascimento.length < 10) {
            Ok = false;
        }

        if (siape === "") {
            Ok = false;
        }

        setFormIsOk(Ok)
        return Ok;

    }

    window.onload = function () {
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


    function nomeHandler(event) {
        setNome(event.target.value);
    }
    function cpfHandler(event) {
        setCPF(mask(event.target.value, ['999.999.999-99']));
    }
    function sobrenomeHandler(event) {
        setSobrenome(event.target.value);
    }
    function emailHandler(event) {
        setEmail(event.target.value);
    }

    function dataNascimentoHandler(event) {
        setDataNascimento(mask(event.target.value, ['99/99/9999']));
    }

    function siapeHandler(event) {
        setSiape(mask(event.target.value, ['9999999']));
    }
    function handleClick(item) {
        const data = item.dataNascimento.slice(8, 10) + "/" + item.dataNascimento.slice(5, 7) + "/" + item.dataNascimento.slice(0, 4);
        setNome(item.nome);
        setSobrenome(item.sobrenome);
        setCPF(item.cpf);
        setEmail(item.email);
        setDataNascimento(data);
        setSiape(item.siape);
        setId(item.id);
        setBtnOperation(true)
    }


    //Buttons---------------------------------------------------
    function handleSubmit() {

        const Ok = FormValidation();

        if (Ok) {
            const data = dataNascimento.slice(6, 10) + '-' + dataNascimento.slice(3, 5) + '-' + dataNascimento.slice(0, 2);

            if (btnOperation) {

                const profeForPutMethod = {
                    id: id,
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    email: email,
                    dataNascimento: data,
                    siape: siape
                }

                myStorage.setItem("toast", "PUT");


                PutRequest(profeForPutMethod).then(go => {
                    window.location.reload();
                })

            } else {
                const profe = {
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    email: email,
                    dataNascimento: data,
                    siape: siape
                }

                myStorage.setItem("toast", "POST");

                PostRequest(profe).then(go => {
                    window.location.reload();
                });
            }
        }
    }


    function handleDelete() {
        myStorage.setItem("toast", "DELETE");

        DeleteRequest().then(go => {
            window.location.reload();
        });
    }

    function handleClear() {
        setNome("");
        setSobrenome("");
        setCPF("");
        setEmail("");
        setDataNascimento("");
        setSiape("");
        setId(0);
        setBtnOperation(false);
    }
    //ASYNC FUNCTIONS------------------------------------------------Esperam o resultado para seguir em frente
    async function PostRequest(profe) {
        try {
            const res = await axios.post(`${BASE_URL}/professor`, profe);
            myStorage.setItem("postSuccess", 1);
            myStorage.setItem("res", res.data.message);
        } catch (err) {
            myStorage.setItem("postSuccess", 0);
            myStorage.setItem("errorMessage", err.response.data.message);
        }

        return true;

    }

    async function PutRequest(profeForPutMethod) {
        try {
            const res = await axios.put(`${BASE_URL}/professor/${profeForPutMethod.id}`, profeForPutMethod);
            myStorage.setItem("putSuccess", 1);
            myStorage.setItem("res", res.data.message);
        } catch (err) {
            myStorage.setItem("putSuccess", 0);
            myStorage.setItem("errorMessage", profeForPutMethod.data);
        }

        return true;
    }

    async function DeleteRequest() {
        try {
            const res = await axios.delete(`${BASE_URL}/professor/${id}`);
            myStorage.setItem("deleteSuccess", 1);
            myStorage.setItem("res", res.data.message);
        } catch (err) {
            myStorage.setItem("deleteSuccess", 0);
            myStorage.setItem("errorMessage", err.response.data.message);
        }

        return true;
    }

    //---------------------------------------------------------------------------

    return (
        <ProfessorContext.Provider value={{
            nome, setNome,
            cpf, setCPF,
            sobrenome, setSobrenome,
            email, setEmail,
            dataNascimento, setDataNascimento,
            siape, setSiape,
            nomeHandler,
            cpfHandler,
            sobrenomeHandler,
            emailHandler,
            dataNascimentoHandler,
            siapeHandler,
            handleClick,
            handleSubmit,
            setBtnOperation,
            btnOperation,
            handleClear,
            handleDelete,
            id, setId,
            myStorage, formIsOk
        }
        }>

            {children}

        </ProfessorContext.Provider>
    )
}