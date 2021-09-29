import axios from "axios";
import { createContext, useState } from "react";
import { BASE_URL } from "utils/requests";


export const ProfessorContext = createContext();

export function ProfessorContextProvider({ children }) {

    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState(0);
    const [btnOperation, setBtnOperation] = useState(false);

    function nomeHandler(event) {
        setNome(event.target.value);
    }
    function cpfHandler(event) {
        setCPF(event.target.value);
    }
    function sobrenomeHandler(event) {
        setSobrenome(event.target.value);
    }
    function emailHandler(event) {
        setEmail(event.target.value);
    }
    function handleClick(item) {
        setNome(item.nome);
        setSobrenome(item.sobrenome);
        setCPF(item.cpf);
        setEmail(item.email);
        setId(item.id);
        setBtnOperation(true)
    }

    //Buttons---------------------------------------------------
    function handleSubmit() {
        
        if(btnOperation){
            const profe = {
                id:id,
                nome: nome,
                sobrenome: sobrenome,
                cpf: cpf,
                email: email
            }

            axios.put(`${BASE_URL}/professor/${id}`, profe)
            .then((response) => console.log(response))
            .catch((err) => {
                alert("ops! ocorreu um erro " + err);
            });
        }else{
            const profe = {
                nome: nome,
                sobrenome: sobrenome,
                cpf: cpf,
                email: email
            }

            axios.post(`${BASE_URL}/professor`, profe)
            .then((response) => console.log(response))
            .catch((err) => {
                alert("ops! ocorreu um erro " + err);
            });
        }
        
    }

    function handleClear() {
        setNome("");
        setSobrenome("");
        setCPF("");
        setEmail("");
        setId(0);
        setBtnOperation(true)
    }

    function handleDelete() {
        axios.delete(`${BASE_URL}/professor/${id}`);
        window.location.reload();
        console.log(id);
    }

    return (
        <ProfessorContext.Provider value={{
            nome, setNome,
            cpf, setCPF,
            sobrenome, setSobrenome,
            email, setEmail,
            nomeHandler,
            cpfHandler,
            sobrenomeHandler,
            emailHandler,
            handleClick,
            handleSubmit,
            setBtnOperation,
            btnOperation,
            handleClear,
            handleDelete,
            id, setId
        }
        }>

            {children}

        </ProfessorContext.Provider>
    )
}