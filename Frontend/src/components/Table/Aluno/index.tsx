import EmptyMessage from "components/EmptyMessage";
import Error504Message from "components/Error/Error504Message";
import LoadingSpinner from "components/Loading";
import Pagination from "components/Pagination";
import { AlunoContext } from "contexts/AlunoContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { usePage } from "hooks/usePage";
import { useContext, useEffect, useState } from "react";
import { AlunoPage } from "types/aluno";
import { dataFormater } from "utils/dataFormater";

function TableAluno() {

    const { handleClick } = useContext(AlunoContext);

    const { activePage, changePage } = usePage();
    const { data, fetchError, isLoading } = useAxiosFetchPage(`/aluno?page=${activePage}`);
    const [aluno, setAluno] = useState<AlunoPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });


    useEffect(() => {
        setAluno(data);
    }, [data])

    return (
        <>
            <div className="row">
                {isLoading &&
                    <div className="d-flex justify-content-center ">
                        <LoadingSpinner margin="mt-5 mb-5"/>
                    </div>}
                {fetchError && <Error504Message size={300}/>}

                {!isLoading && !fetchError && (aluno.totalElements > 0 ?
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Matricula</th>
                                    <th scope="col" className="col-4">Disciplinas</th>
                                    <th scope="col">Inclusão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aluno.content?.map(item => (
                                    <tr className={`${item.ativo ? "":"text-muted"}`}key={item.id} onClick={() => handleClick!(item)}>
                                        <td className="align-middle" height="50px">{item.nomeCompleto}</td>
                                        <td className="align-middle">{item.cpf}</td>
                                        <td className="align-middle">{item.matricula}</td>
                                        <td className="">
                                            {item.disciplinas?.length ?
                                                item.disciplinas.map(disciplina => (
                                                    <span className="badge rounded-pill bg-primary p-2 px-3 mx-1 mb-1 mt-1 fw-normal fs-6" key={disciplina.id}>{disciplina.nome}</span>
                                                ))
                                                :
                                                <span className="badge rounded-pill bg-secondary fw-normal p-2 mx-1 my-1 fs-6"> Nenhuma </span>
                                            }
                                        </td>
                                        <td className="align-middle">{dataFormater(item.dataInclusao)}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    : 
                    <EmptyMessage text="Sem aluno para mostrar"/>
                    )}
            </div>
            <Pagination page={aluno} onPageChange={changePage} />
        </>
    );
}

export default TableAluno;
