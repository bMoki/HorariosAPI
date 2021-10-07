import { ProfessorContext } from "contexts/ProfessorContext";
import { useContext } from "react";

function TableProf() {

    const { handleClick, page, isLoading, fetchError } = useContext(ProfessorContext);

    return (
        <>

            {isLoading &&
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            {fetchError && <p>{fetchError}</p>}

            {!isLoading && !fetchError && (page.totalElements > 0 ?
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
                        {page.content?.map(item => (
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
            :  <p>Sem professor para mostrar</p>)}

        </>
    );
}

export default TableProf;
