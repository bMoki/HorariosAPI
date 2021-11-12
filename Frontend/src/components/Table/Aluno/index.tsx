import EmptyMessage from "components/EmptyMessage";
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
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                {fetchError && <p>{fetchError}</p>}

                {!isLoading && !fetchError && (aluno.totalElements > 0 ?
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">Matricula</th>
                                    <th scope="col">Inativação</th>
                                    <th scope="col">Inclusão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {aluno.content?.map(item => (
                                    <tr className={`${item.ativo ? "":"text-muted"}`}key={item.id} onClick={() => handleClick!(item)}>
                                        <td className="align-middle" height="50px">{item.nomeCompleto}</td>
                                        <td className="align-middle">{item.cpf}</td>
                                        <td className="align-middle">{item.matricula}</td>
                                        <td className="align-middle">{dataFormater(item.dataInativacao)}</td>
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
