import useApi from "hooks/useApi";
import { ChangeEvent, createContext, FC, useState } from "react";
import { mask } from "remask";
import { Aluno } from "types/aluno";
import { UserDetail, Roles } from "types/user";
import { dataFormater } from "utils/dataFormater";

interface IUsuarioContext {
    id: number,
    name: string,
    username: string,
    password: string,
    admin: boolean,
    btnOperation: boolean,
    formIsOk: boolean,

    nameHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    passwordHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    usernameHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    adminHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    handleSubmit?: () => void,
    handleClear?: () => void,
    handleDeleteAluno?: () => void,
    handleClick?: (item: Aluno) => void,

}

const defaultState = {
    id: 0,
    name: "",
    username: "",
    password: "",
    admin: false,
    btnOperation: false,
    formIsOk: true,
}

export const UsuarioContext = createContext<IUsuarioContext>(defaultState);

const UsuarioContextProvider: FC = ({ children }) => {
    const api = useApi();
    const [id, setId] = useState(0),
        [name, setName] = useState(""),
        [username, setUsername] = useState(""),
        [password, setPassword] = useState(""),
        [admin, setAdmin] = useState(false),
        [roles, setRoles] = useState<Roles[] | undefined>(undefined),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true);

    function nameHandler(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function usernameHandler(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function passwordHandler(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function adminHandler(event: ChangeEvent<HTMLInputElement>) {
        event.target.checked ?
            setRoles([{
                id: 1,
                name: "ROLE_USER"
            },
            {
                id: 2,
                name: "ROLE_ADMIN"
            }])
            :
            setRoles([{
                
            }])
        
    }

    function handleClick(item: UserDetail) {

        setId(item?.id === undefined ? 0 : item.id);
        setName(item?.name === undefined ? "" : item.name);
        setUsername(item?.username === undefined ? "" : item.username);

        setBtnOperation(true);
    }

    function handleClear() {
        setId(0);

        setName("");
        setUsername("");
        setBtnOperation(false);
        setFormIsOk(true);
    }

    function FormValidation() {

        if (name === "") {
            return false;
        }

        if (username === "") {
            return false;
        }

        return true;

    }

    // function handleSubmit() {

    //     const Ok = FormValidation();
    //     setFormIsOk(Ok)
    //     if (Ok) {

    //         if (btnOperation) {

    //             const usuario = {
    //                 id: id,
    //                 name: name,
    //                 username: username,
    //                 password: password,

    //             }

    //             api.put(`/aluno/${aluno.id}`, aluno);

    //         } else {
    //             const aluno = {
    //                 nomeCompleto: nomeCompleto,
    //                 matricula: matricula,
    //                 cpf: cpf,
    //                 ativo: ativo,
    //                 dataInativacao: dtInativacao,
    //                 dataInclusao: dtInclusao
    //             }

    //             api.post(`/aluno`, aluno);
    //         }
    //     }
    // }

    // function handleDeleteAluno() {
    //     api.delete(`/aluno/${id}`);
    // }

    return (
        <UsuarioContext.Provider value={{
            name, username, password, admin, id,
            nameHandler, usernameHandler, passwordHandler, adminHandler,
            btnOperation, formIsOk, handleClear, //handleSubmit,
            handleClick, //handleDeleteAluno
        }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioContextProvider;