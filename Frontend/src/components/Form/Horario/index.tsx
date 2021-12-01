import ComboBoxDisciplinaFiltered from "components/ComboBox/Disciplina/Filtered";
import ComboBoxProfFiltered from "components/ComboBox/Professor/Filtered";
import LoadingSpinner from "components/Loading";
import Modal from "components/Modal";
import { HorarioContext } from "contexts/HorarioContext";
import { LoginContext } from "contexts/LoginContext";
import { useContext, useEffect, useRef } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

function FormHorario() {

    const { dia, periodo, turma, btnOperation, handleClear, handleSubmit, formIsOk, handleDeleteHorario } = useContext(HorarioContext);
    const { loadingSubmit } = useContext(LoginContext);

    const formRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (formRef.current) formRef.current.focus();
    }, [dia, periodo, turma])
    return (
        <>
            <form className="row g-3"  >
                <div className="col-lg-3 col-sm-6 me-4">
                    <label htmlFor="inputSemestre" className="form-label">Semestre</label>
                    <input type="text" className={formIsOk ? "form-control" : turma ? "form-control" : "form-control is-invalid"} disabled id="inputSemestre" defaultValue={turma?.nome} />
                </div>
                <div className="col-lg-2 col-sm-4 me-4">
                    <label htmlFor="inputDia" className="form-label">Dia</label>
                    <input type="text" className={formIsOk ? "form-control" : dia !== "" ? "form-control" : "form-control is-invalid"} disabled id="inputDia" defaultValue={dia} />
                </div>
                <div className="col-lg-2 col-sm-2 ">
                    <label htmlFor="inputPeriodo" className="form-label">Periodo</label>
                    <input type="text" className={formIsOk ? "form-control" : periodo ? "form-control" : "form-control is-invalid"} disabled id="inputPeriodo" defaultValue={periodo} />
                </div>
                <div className="row mt-3">
                    <div className="col-4">
                        <ComboBoxDisciplinaFiltered />
                    </div>
                    <div className="col-4">
                        <ComboBoxProfFiltered />
                    </div>
                    <div className="col d-flex align-items-end">
                        <div className="me-auto p-2 pb-0 ps-0 ">
                            <button type="button" ref={formRef} className="btn btn-success" id="submit" title="Salvar" onClick={handleSubmit}>{loadingSubmit ? <LoadingSpinner margin="m-1" small /> : btnOperation ? "Alterar" : "Cadastrar"}</button>
                        </div>
                        <div className="p-2 pb-0">
                            <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                        </div>
                        <div className="p-2 pb-0">
                            <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear} ><AiOutlineClear /></button>
                        </div>
                    </div>
                </div>


            </form>
            <Modal message="Tem certeza que deseja excluir o horário?" deleteFunction={handleDeleteHorario} />
        </>
    );
};
export default FormHorario;
