import { useContext } from "react";
import { ProfessorContext } from "contexts/ProfessorContext";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import Modal from "components/Modal";
import { LoginContext } from "contexts/LoginContext";
import LoadingSpinner from "components/Loading";

function FormProf() {

    const { nome, cpf, email, sobrenome, dataNascimento, siape,
        nomeHandler, sobrenomeHandler, cpfHandler, emailHandler, dataNascimentoHandler, siapeHandler,
        handleSubmit, btnOperation, handleClear, formIsOk, handleDeleteProfessor
    } = useContext(ProfessorContext);

    const { loadingSubmit } = useContext(LoginContext);


    return (
        <>
            <form className="row g-3" >
                <div className="col-6">
                    <label htmlFor="inputName" className="form-label">Nome</label>
                    <input type="text" className={formIsOk ? "form-control" : nome !== "" ? "form-control" : "form-control is-invalid"} id="inputName" value={nome} onChange={nomeHandler} />
                </div>
                <div className="col-6">
                    <label htmlFor="inputSobrenome" className="form-label">Sobrenome</label>
                    <input type="text" className={formIsOk ? "form-control" : sobrenome !== "" ? "form-control" : "form-control is-invalid"} id="inputSobrenome" value={sobrenome} onChange={sobrenomeHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCPF" className="form-label">CPF</label>
                    <input type="text" className={formIsOk ? "form-control" : cpf.length > 13 ? "form-control" : "form-control is-invalid"} id="inputCPF" value={cpf} onChange={cpfHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputSIAPE" className="form-label">SIAPE</label>
                    <input type="text" className="form-control" id="inputSIAPE" value={siape} onChange={siapeHandler} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" value={email} onChange={emailHandler} />
                </div>

                <div className="col-7">
                    <label htmlFor="inputData" className="form-label">Data de Nascimento</label>
                    <input type="text" className="form-control" id="inputData" value={dataNascimento} onChange={dataNascimentoHandler} />
                </div>
                <div className="d-flex">
                    <div className="me-auto p-2">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" onClick={handleSubmit}>{loadingSubmit ? <LoadingSpinner margin="m-1" small/> : btnOperation ? "Alterar" : "Cadastrar"}</button>
                    </div>
                    <div className="p-2 ">
                        <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                    </div>
                    <div className="p-2 ">
                        <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear}><AiOutlineClear /></button>
                    </div>
                </div>
            </form>
            <Modal message="Tem certeza que deseja excluir o professor?" deleteFunction={handleDeleteProfessor} />
        </>
    );
};
export default FormProf;
