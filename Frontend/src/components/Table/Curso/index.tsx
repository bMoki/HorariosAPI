import EmptyMessage from "components/EmptyMessage";
import Error504Message from "components/Error/Error504Message";
import LoadingSpinner from "components/Loading";
import Pagination from "components/Pagination";
import { CursoContext } from "contexts/CursoContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { usePage } from "hooks/usePage";
import { useContext, useEffect, useState } from "react";
import { CursoPage } from "types/curso";

type IProps = {
    search: string;
}
function TableCurso({ search }: IProps) {

    const { handleClick } = useContext(CursoContext);
    const { activePage, changePage } = usePage();
    const [curso, setCurso] = useState<CursoPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    const { data, fetchError, isLoading } = useAxiosFetchPage(`/curso?page=${activePage}&search=${search}`);


    useEffect(() => {
        setCurso(data);
    }, [data])

    return (
        <>

            <div className="row">
                {isLoading &&
                    <div className="d-flex justify-content-center">
                        <LoadingSpinner margin="mt-5 mb-5" />
                    </div>}
                {fetchError && <Error504Message size={300} />}
                {!isLoading && !fetchError && (curso.content?.length ?
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Disciplina</th>
                                    <th scope="col">Semestres</th>
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
                                        <td className="align-middle">{item.quantidadeTurma}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>

                    :
                    <EmptyMessage text="Sem curso para mostrar" />
                )}
            </div>

            <Pagination page={curso} onPageChange={changePage} />

        </>
    );
}

export default TableCurso;
