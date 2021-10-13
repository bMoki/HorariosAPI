import { DisciplinaContext } from "contexts/DisciplinaContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { useContext, useEffect, useState } from "react";
import { DisciplinaPage } from "types/disciplina";
import { BASE_URL } from "utils/requests";


function TableDisciplina() {

    const { handleClick } = useContext(DisciplinaContext);
    const [disciplina, setDisciplina] = useState<DisciplinaPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/disciplina`);


    useEffect(() => {
        setDisciplina(data);
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
            {!isLoading && !fetchError && (disciplina.content?.length ?
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Professor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disciplina.content?.map(item => (
                                <tr key={item.id} onClick={() => handleClick!(item)} className="p-1">
                                    <td className="align-middle">{item.nome}</td>
                                    <td >
                                        {item.professores?.length ?
                                            item.professores.map(prof => (
                                                <span className="badge rounded-pill bg-primary p-2 px-3 mx-1 mb-1 mt-1 fw-normal fs-6" key={prof.id}>{prof.nome}</span>
                                            ))
                                            :
                                            <span className="badge rounded-pill bg-secondary fw-normal p-2 mx-1 my-1 fs-6"> Nenhum </span>
                                        }



                                    </td>
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
