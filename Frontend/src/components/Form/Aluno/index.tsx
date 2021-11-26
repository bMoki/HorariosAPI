import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { AlunoContext } from "contexts/AlunoContext";
import ComboBoxDisciplina from "components/ComboBox/Disciplina";
import Modal from "components/Modal";





function FormAluno() {

    const { nomeCompleto, cpf, matricula, dataInativacao, dataInclusao, ativo,
        matriculaHandler, cpfHandler, nomeCompletoHandler, dataInativacaoHandler, dataInclusaoHandler, ativoHandler,
        handleSubmit, btnOperation, handleClear, formIsOk, disciplinas, selectedDisciplinaHandler
    } = useContext(AlunoContext);



    return (
        <>
            <form className="row g-3" >
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Nome Completo</label>
                    <input type="text" className={formIsOk ? "form-control" : nomeCompleto !== "" ? "form-control" : "form-control is-invalid"} id="inputName" value={nomeCompleto} onChange={nomeCompletoHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCPF" className="form-label">CPF</label>
                    <input type="text" className={formIsOk ? "form-control" : cpf.length > 13 ? "form-control" : "form-control is-invalid"} id="inputCPF" value={cpf} onChange={cpfHandler} />
                </div>
                <div className="col-6">
                    <label htmlFor="inputData" className="form-label">Data de inclusão</label>
                    <input type="text" className={formIsOk ? "form-control" : dataInclusao.length > 9 ? "form-control" : "form-control is-invalid"} id="inputData" value={dataInclusao} onChange={dataInclusaoHandler} />
                </div>
                <div className="col-6">
                    <label htmlFor="inputData" className="form-label">Data de inativação</label>
                    <input type="text" className="form-control" id="inputData" value={dataInativacao} onChange={dataInativacaoHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputMatricula" className="form-label">Matricula</label>
                    <input type="text" className={formIsOk ? "form-control" : matricula !== "" ? "form-control" : "form-control is-invalid"} id="inputMatricula" value={matricula} onChange={matriculaHandler} />
                </div>
                <div className="col-lg-6 col-md-6">
                    <ComboBoxDisciplina Handler={selectedDisciplinaHandler} disciplinas={disciplinas}/>
                </div>
                <div className="col-md-6 d-flex align-items-end mb-1">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="inputAtivo" checked={ativo} onChange={ativoHandler} />
                        <label className="form-check-label" htmlFor="inputAtivo">
                            Ativo
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
            <Modal message="Tem certeza que deseja excluir o aluno?" context="aluno" />
        </>
    );
};
export default FormAluno;
