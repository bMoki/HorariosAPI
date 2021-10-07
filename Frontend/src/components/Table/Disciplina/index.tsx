import { DisciplinaContext } from "contexts/DisciplinaContext";
import { useContext } from "react";


function TableDisciplina() {

    const { disciplina, isLoading, fetchError, handleClick } = useContext(DisciplinaContext);

    return (
        <>



            {isLoading &&
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            {fetchError && <p>{fetchError}</p>}
            {!isLoading && !fetchError && (disciplina.length ?
                <div className="table-responsive">
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disciplina?.map(item => (
                                <tr key={item.id} onClick={() => handleClick!(item)}>
                                    <td >{item.nome}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>

                : <p>Sem disciplina para mostrar</p>)}







        </>
    );
}

export default TableDisciplina;
