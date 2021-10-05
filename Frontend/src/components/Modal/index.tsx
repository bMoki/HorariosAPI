import { ProfessorContext } from "contexts/ProfessorContext";
import { useContext } from "react";



function Modal() {
    const { handleDelete } = useContext(ProfessorContext);

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
                           <h5>Tem certeza que deseja excluir o professor?</h5>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Não</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Sim</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;