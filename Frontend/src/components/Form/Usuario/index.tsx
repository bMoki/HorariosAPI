import { useContext, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { UsuarioContext } from "contexts/UsuarioContext";
import { UserDetail } from "types/user";
import Modal from "components/Modal";



type IProps = {
    User: UserDetail | undefined
}

function FormUsuario({ User }: IProps) {

    const { name, username, admin,
        nameHandler, adminHandler, usernameHandler, password, passwordHandler,
        handleSubmit, btnOperation, handleClear, formIsOk, handleClick,
        changePassword,changePasswordHandler,handleDeleteUsuario
    } = useContext(UsuarioContext);

    

    useEffect(() => {
        if (User !== undefined && handleClick !== undefined) {
            handleClick(User);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [User])

    return (
        <>
            <form className="row g-3" >
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Nome Completo</label>
                    <input type="text" className={formIsOk ? "form-control" : name !== "" ? "form-control" : "form-control is-invalid"} id="inputName" value={name} onChange={nameHandler} />
                </div>
                <div className="col-6">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername" value={username} onChange={usernameHandler} />
                </div>

                <div className="col-6">
                    <label htmlFor="inputSenha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="inputSenha" disabled={User ? !changePassword : btnOperation} value={password} onChange={passwordHandler} />
                    {User ?
                        <div className="btn p-0" onClick={changePasswordHandler}><small className="text-muted ">{changePassword ? "Cancelar" : "Mudar senha"}</small></div>
                        :
                        ""
                    }

                </div>
                {User ? "" :
                    <div className="col-md-6 d-flex align-items-end mb-1">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="inputAdmin" checked={admin} onChange={adminHandler} />
                            <label className="form-check-label" htmlFor="inputAdmin">
                                Administrador
                            </label>
                        </div>
                    </div>}

                <div className="d-flex">
                    <div className="me-auto p-2">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" onClick={handleSubmit}>{btnOperation ? User ? "Salvar " : "Alterar" : "Cadastrar"}</button>
                    </div>
                    {User ? "" :
                        <>
                            <div className="p-2 ">
                                <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                            </div>
                            <div className="p-2 ">
                                <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear}><AiOutlineClear /></button>
                            </div>
                        </>
                    }

                </div>
            </form>
            <Modal message="Tem certeza que deseja excluir o usuário?" deleteFunction={handleDeleteUsuario} />
        </>
    );
};
export default FormUsuario;
