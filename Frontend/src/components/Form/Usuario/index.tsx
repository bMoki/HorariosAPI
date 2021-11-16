import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { UsuarioContext } from "contexts/UsuarioContext";





function FormUsuario() {

    const { nomeCompleto, ativo,
        nomeCompletoHandler, ativoHandler,
        handleSubmit, btnOperation, handleClear, formIsOk
    } = useContext(UsuarioContext);



    return (
        <>
            <form className="row g-3" >
                <div className="col-12">
                    <label htmlFor="inputName" className="form-label">Nome Completo</label>
                    <input type="text" className={formIsOk ? "form-control" : nomeCompleto !== "" ? "form-control" : "form-control is-invalid"} id="inputName" value={nomeCompleto} onChange={nomeCompletoHandler} />
                </div>
                <div className="col-6">
                    <label htmlFor="inputUsername" className="form-label">Username</label>
                    <input type="text" className="form-control" id="inputUsername"  />
                </div>
                
                <div className="col-6">
                    <label htmlFor="inputSenha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="inputSenha"/>
                </div>

                <div className="col-md-6 d-flex align-items-end mb-1">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="inputAdmin" checked={ativo} onChange={ativoHandler} />
                        <label className="form-check-label" htmlFor="inputAdmin">
                            Administrador
                        </label>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="me-auto p-2">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" onClick={handleSubmit}>{btnOperation ? "Alterar" : "Cadastrar"}</button>
                    </div>
                    <div className="p-2 ">
                        <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                    </div>
                    <div className="p-2 ">
                        <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear}><AiOutlineClear /></button>
                    </div>
                </div>
            </form>

        </>
    );
};
export default FormUsuario;
