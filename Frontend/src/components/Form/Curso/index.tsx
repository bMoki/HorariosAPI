import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import ComboBoxDisciplina from "components/ComboBox/Disciplina";
import { CursoContext } from "contexts/CursoContext";
import Modal from "components/Modal";
import LoadingSpinner from "components/Loading";
import { LoginContext } from "contexts/LoginContext";

function FormCurso() {

    const { nome, nomeHandler,quantidadeHandler,quantidade, btnOperation, handleClear, handleSubmit, formIsOk,selectedDisciplinaHandler,disciplinas,handleDeleteCurso
    } = useContext(CursoContext);

    const {loadingSubmit} = useContext(LoginContext);


    return (
        <>
            <form className="row g-3" >
                <div className="col-lg-12 col-md-6">
                    <label htmlFor="inputName" className="form-label" >Nome</label>
                    <input type="text" className={formIsOk ? "form-control" : nome !== "" ? "form-control" : "form-control is-invalid"} id="inputName" value={nome} onChange={nomeHandler} />
                </div>

                <div className="col-lg-12 col-md-6">
                    <ComboBoxDisciplina Handler={selectedDisciplinaHandler} disciplinas={disciplinas}/>
                </div>

                <div className="col-lg-12 col-md-6">
                    <label htmlFor="inputQuantidade" className="form-label" >Quantidade de semestres</label>
                    <div className="col-lg-3 col-md-6">
                        <input type="number" className="form-control" id="inputQuantidade" value={quantidade} onChange={quantidadeHandler} />
                    </div>
                </div>



                <div className=" d-flex">
                    <div className="me-auto p-2">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" onClick={handleSubmit}>{loadingSubmit ? <LoadingSpinner margin="m-1" small/> :btnOperation ? "Alterar" : "Cadastrar"}</button>
                    </div>
                    <div className="p-2 ">
                        <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                    </div>
                    <div className="p-2">
                        <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear} ><AiOutlineClear /></button>
                    </div>
                </div>

            </form>
            <Modal message="Tem certeza que deseja excluir o curso?" deleteFunction={handleDeleteCurso} />
        </>
    );
};
export default FormCurso;
