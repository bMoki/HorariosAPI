import EmptyMessage from "components/EmptyMessage";
import Error504Message from "components/Error/Error504Message";
import LoadingSpinner from "components/Loading";
import Pagination from "components/Pagination";
import { DisciplinaContext } from "contexts/DisciplinaContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { usePage } from "hooks/usePage";
import { useContext, useEffect, useState } from "react";
import { DisciplinaPage } from "types/disciplina";


function TableDisciplina() {

    const { handleClick } = useContext(DisciplinaContext);
    const { activePage, changePage } = usePage();
    const [disciplina, setDisciplina] = useState<DisciplinaPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    const { data, fetchError, isLoading } = useAxiosFetchPage(`/disciplina?page=${activePage}`);


    useEffect(() => {
        setDisciplina(data);
    }, [data])

    return (
        <>

            <div className="row">

                {isLoading &&
                    <div className="d-flex justify-content-center">
                       <LoadingSpinner margin="mt-5 mb-5"/>
                    </div>}
                {fetchError &&<Error504Message size={300}/>}
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

                    :
                    <EmptyMessage text="Sem disciplina para mostrar" />
                )}

            </div>
            <Pagination page={disciplina} onPageChange={changePage} />
        </>
    );
}

export default TableDisciplina;
