import { createContext, useState, ChangeEvent, FC } from "react";
import { mask } from "remask";
import { Prof } from "types/prof";
import { dataFormater } from "utils/dataFormater";
import useApi from "hooks/useApi";
import { cpfFormater } from "utils/cpfFormater";

interface IProfessorContext {
    nome: string,
    sobrenome: string,
    cpf: string,
    dataNascimento: string,
    siape: string,
    email: string,
    id: number,
    btnOperation: boolean,
    formIsOk: boolean,

    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    sobrenomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    cpfHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    emailHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    siapeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    dataNascimentoHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    
    handleSubmit?: () => void,
    handleClear?: () => void,
    handleDeleteProfessor?: () => void,
    handleClick?: (item: Prof) => void,
}

const defaultState = {
    nome: "",
    sobrenome: "",
    cpf: "",
    dataNascimento: "",
    siape: "",
    email: "",
    id: 0,
    btnOperation: false,
    formIsOk: true,
}

export const ProfessorContext = createContext<IProfessorContext>(defaultState);

const ProfessorContextProvider: FC = ({ children }) => {
    const api = useApi();
    const [nome, setNome] = useState(""),
        [cpf, setCPF] = useState(""),
        [sobrenome, setSobrenome] = useState(""),
        [email, setEmail] = useState(""),
        [dataNascimento, setDataNascimento] = useState(""),
        [siape, setSiape] = useState(""),
        [id, setId] = useState(0),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true);

    function nomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }
    function cpfHandler(event: ChangeEvent<HTMLInputElement>) {
        setCPF(mask(event.target.value, ['999.999.999-99']));
    }
    function sobrenomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setSobrenome(event.target.value);
    }
    function emailHandler(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function dataNascimentoHandler(event: ChangeEvent<HTMLInputElement>) {
        setDataNascimento(mask(event.target.value, ['99/99/9999']));
    }
    function siapeHandler(event: ChangeEvent<HTMLInputElement>) {
        setSiape(mask(event.target.value, ['9999999']));
    }
   
    function FormValidation() {

        if (nome === "") {
            return false;
        }

        if (cpf.length < 14) {
            return false;
        }

        if (sobrenome === "") {
            return false;
        }

        return true;

    }

    function handleClick(item: Prof) {
        const data = dataFormater(item.dataNascimento);
        const cpf = cpfFormater(item.cpf);
        setNome(item?.nome === undefined ? "" : item.nome === null ? "" : item.nome);
        setSobrenome(item?.sobrenome === undefined ? "" : item.sobrenome === null ? "" : item.sobrenome);
        setCPF(cpf);
        setEmail(item?.email === undefined ? "" : item.email === null ? "" : item.email);
        setDataNascimento(data === undefined ? "" : data === null ? "" : data);
        setSiape(item?.siape === undefined ? "" : item.siape === null ? "" : item.siape);
        setId(item?.id === undefined ? 0 : item.id === null ? 0 : item.id);
        setBtnOperation(true)
    }


    function handleSubmit() {

        const Ok = FormValidation();
        setFormIsOk(Ok)
        if (Ok) {
            const data = dataFormater(dataNascimento)

            if (btnOperation) {

                const profe = {
                    id: id,
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    email: email,
                    dataNascimento: data,
                    siape: siape
                }


                api.put(`/professor/${profe.id}`, profe);




            } else {
                const profe = {
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    email: email,
                    dataNascimento: data,
                    siape: siape
                }


                api.post(`/professor`, profe);




            }
        }
    }

    function handleDeleteProfessor() {
        api.delete(`/professor/${id}`);
    }

    function handleClear() {
        setNome("");
        setSobrenome("");
        setCPF("");
        setEmail("");
        setDataNascimento("");
        setSiape("");
        setId(0);
        setFormIsOk(true);
        setBtnOperation(false);
    }

    return (
        <ProfessorContext.Provider value={{
            id,
            nome,
            cpf,
            sobrenome,
            email,
            dataNascimento,
            siape,
            nomeHandler,
            cpfHandler,
            sobrenomeHandler,
            emailHandler,
            dataNascimentoHandler,
            siapeHandler,
            handleClick,
            handleSubmit,
            btnOperation,
            handleClear,
            handleDeleteProfessor,
            formIsOk,
        }
        }>

            {children}

        </ProfessorContext.Provider>
    )
};

export default ProfessorContextProvider;