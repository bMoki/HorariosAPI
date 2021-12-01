import EmptyMessage from "components/EmptyMessage";
import Error504Message from "components/Error/Error504Message";
import LoadingSpinner from "components/Loading";
import Pagination from "components/Pagination";
import { ProfessorContext } from "contexts/ProfessorContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { usePage } from "hooks/usePage";
import { useContext, useEffect, useState } from "react";
import { ProfPage } from "types/prof";

function TableProf() {

    const { handleClick } = useContext(ProfessorContext);

    const { activePage, changePage } = usePage();
    const { data, fetchError, isLoading } = useAxiosFetchPage(`/professor?page=${activePage}`);
    const [professor, setProfessor] = useState<ProfPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });


    useEffect(() => {
        setProfessor(data);
    }, [data])

    return (
        <>
            <div className="row">
                {isLoading &&
                    <div className="d-flex justify-content-center">
                       <LoadingSpinner margin="mt-5 mb-5"/>
                    </div>}
                {fetchError && <Error504Message size={300}/>}

                {!isLoading && !fetchError && (professor.totalElements > 0 ?
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Sobrenome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">CPF</th>
                                    <th scope="col">SIAPE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {professor.content?.map(item => (
                                    <tr key={item.id} onClick={() => handleClick!(item)}>
                                        <td className="align-middle" height="50px">{item.nome}</td>
                                        <td className="align-middle">{item.sobrenome}</td>
                                        <td className="align-middle">{item.email}</td>
                                        <td className="align-middle">{item.cpf}</td>
                                        <td className="align-middle">{item.siape}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    :
                    <EmptyMessage text="Sem professor para mostrar" />
                )
                }
            </div>
            <Pagination page={professor} onPageChange={changePage} />
        </>
    );
}

export default TableProf;
