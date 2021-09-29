import { ProfessorContext } from "contexts/ProfessorContext";
import { useContext } from "react";



function Modal() {
    const { handleDelete } = useContext(ProfessorContext);

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel"> ATENÇÃO</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <h6>Tem certeza que deseja excluir o professor?</h6>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleDelete}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;