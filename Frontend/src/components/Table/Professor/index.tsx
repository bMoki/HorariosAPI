import { ProfessorContext } from "contexts/ProfessorContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { useContext, useEffect, useState } from "react";
import { ProfPage } from "types/prof";
import { BASE_URL } from "utils/requests";

function TableProf() {

    const { handleClick } = useContext(ProfessorContext);

    const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/professor`);
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

            {isLoading &&
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            {fetchError && <p>{fetchError}</p>}

            {!isLoading && !fetchError && (professor.totalElements > 0 ?
                <div className="table-responsive">
                    <table className="table table-hover ">
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
                                    <td >{item.nome}</td>
                                    <td>{item.sobrenome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.cpf}</td>
                                    <td>{item.siape}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>
                : <p>Sem professor para mostrar</p>)}

        </>
    );
}

export default TableProf;
