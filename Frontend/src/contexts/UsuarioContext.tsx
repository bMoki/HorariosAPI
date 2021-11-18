import useApi from "hooks/useApi";
import { ChangeEvent, createContext, FC, useState } from "react";
import { UserDetail } from "types/user";


interface IUsuarioContext {
    id: number,
    name: string,
    username: string,
    password: string,
    admin: boolean,
    btnOperation: boolean,
    formIsOk: boolean,
    changePassword: boolean,

    nameHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    passwordHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    usernameHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    changePasswordHandler?: () => void,
    adminHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    handleSubmit?: () => void,
    handleClear?: () => void,
    handleDeleteUsuario?: () => void,
    handleClick?: (item: UserDetail) => void,

}

const defaultState = {
    id: 0,
    name: "",
    username: "",
    password: "",
    admin: false,
    btnOperation: false,
    formIsOk: true,
    changePassword: false
}

export const UsuarioContext = createContext<IUsuarioContext>(defaultState);

const UsuarioContextProvider: FC = ({ children }) => {
    const api = useApi();
    const [id, setId] = useState(0),
        [name, setName] = useState(""),
        [username, setUsername] = useState(""),
        [password, setPassword] = useState<string>(""),
        [admin, setAdmin] = useState(false),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true),
        [changePassword, setChangePassword] = useState(false);

    function changePasswordHandler() {
        setChangePassword(changePassword ? false : true);
    }
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

        var usuario: UserDetail = {
            id: id,
            name: name,
            username: username,
            password: password,
            admin: admin
        }

        if (Ok) {

            if (btnOperation) {

                if (!changePassword) delete usuario.password;

                api.put(`/usuario/save/${usuario.id}`, usuario);

            } else {
              
                delete usuario.id;

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
            handleClick, handleDeleteUsuario, changePassword, changePasswordHandler
        }}>
            {children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioContextProvider;