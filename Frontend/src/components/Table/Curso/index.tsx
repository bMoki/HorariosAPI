import { CursoContext } from "contexts/CursoContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { useContext, useEffect, useState } from "react";
import { CursoPage } from "types/curso";
import { BASE_URL } from "utils/requests";


function TableCurso() {

    const { handleClick } = useContext(CursoContext);
    const [curso, setCurso] = useState<CursoPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/curso`);


    useEffect(() => {
        setCurso(data);
    }, [data])

    return (
        <>



            {isLoading &&
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            {fetchError && <p>{fetchError}</p>}
            {!isLoading && !fetchError && (curso.content?.length ?
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Disciplina</th>
                            </tr>
                        </thead>
                        <tbody>
                            {curso.content?.map(item => (
                                <tr key={item.id} onClick={() => handleClick!(item)} className="p-1">
                                    <td className="align-middle">{item.nome}</td>
                                    <td >
                                        {item.disciplinas?.length ?
                                            item.disciplinas.map(disciplina => (
                                                <span className="badge rounded-pill bg-primary p-2 px-3 mx-1 mb-1 mt-1 fw-normal fs-6" key={disciplina.id}>{disciplina.nome}</span>
                                            ))
                                            :
                                            <span className="badge rounded-pill bg-secondary fw-normal p-2 mx-1 my-1 fs-6"> Nenhuma </span>
                                        }



                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>

                : <p>Sem curso para mostrar</p>)}







        </>
    );
}

export default TableCurso;