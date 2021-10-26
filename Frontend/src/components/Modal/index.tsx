import { ProfessorContext } from "contexts/ProfessorContext";
import { DisciplinaContext } from "contexts/DisciplinaContext";
import { useContext } from "react";
import { CursoContext } from "contexts/CursoContext";
import { HorarioContext } from "contexts/HorarioContext";

interface IProps {
    message: string;
    context: string;
}

function Modal({ message, context }: IProps) {
    const { handleDeleteProfessor } = useContext(ProfessorContext);
    const { handleDeleteDisciplina } = useContext(DisciplinaContext);
    const { handleDeleteCurso } = useContext(CursoContext);
    const { handleDeleteHorario } = useContext(HorarioContext);

    const onClickFunction = (context: string) => {
        switch (context) {
            case "professor":
                handleDeleteProfessor!();
                break;
            case "disciplina":
                handleDeleteDisciplina!();
                break;
            case "curso":
                handleDeleteCurso!();
                break;
            case "horario":
                handleDeleteHorario!();
                break;
        }
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content text-center">
                        <div className="modal-header bg-danger text-white d-flex justify-content-center">
                            <h4 className="modal-title" id="exampleModalLabel"> ATENÇÃO</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5>{message}</h5>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Não</button>
                            <button type="button" className="btn btn-danger" onClick={() => onClickFunction(context)}>Sim</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;