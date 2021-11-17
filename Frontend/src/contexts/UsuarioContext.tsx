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
    password: string | undefined,
    admin: boolean,
    btnOperation: boolean,
    formIsOk: boolean,

    nameHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    passwordHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    usernameHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    adminHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    handleSubmit?: () => void,
    handleClear?: () => void,
    handleDeleteUsuario?: () => void,
    handleClick?: (item: Aluno) => void,

}

const defaultState = {
    id: 0,
    name: "",
    username: "",
    password: undefined,
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
        [password, setPassword] = useState<string | undefined>(undefined),
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
        setAdmin(event.target.checked);
    }

    function handleClick(item: UserDetail) {

        setId(item?.id === undefined ? 0 : item.id);
        setName(item?.name === undefined ? "" : item.name);
        setUsername(item?.username === undefined ? "" : item.username);
        setAdmin(item?.admin === undefined ? true : item.admin);
        setBtnOperation(true);
    }

    function handleClear() {
        setId(0);
        setAdmin(false);
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

        if (!btnOperation && password === "") {
            return false;
        }

        return true;

    }

    function handleSubmit() {

        const Ok = FormValidation();
        setFormIsOk(Ok)
        if (Ok) {

            if (btnOperation) {

                const usuario = {
                    id: id,
                    name: name,
                    username: username,
                    password: password,
                    admin: admin
                }

                api.put(`/usuario/save/${usuario.id}`, usuario);

            } else {
                const usuario = {
                    name: name,
                    username: username,
                    password: password,
                    admin: admin
                }

                api.post(`/usuario/save`, usuario);
            }
        }
    }

    function handleDeleteUsuario() {
        api.delete(`/usuario/delete/${id}`);
    }

    return (
        <UsuarioContext.Provider value={{
            name, username, password, admin, id,
            nameHandler, usernameHandler, passwordHandler, adminHandler,
            btnOperation, formIsOk, handleClear, handleSubmit,
            handleClick, handleDeleteUsuario
        }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioContextProvider;