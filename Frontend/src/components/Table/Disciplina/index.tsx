import axios from "axios";
import { DisciplinaContext } from "contexts/DisciplinaContext";
import { useContext, useEffect, useState } from "react";
import { Disciplina } from "types/disciplina";
import { BASE_URL } from "utils/requests";

function TableDisciplina() {

    const { disciplina, isLoading, fetchError, handleClick } = useContext(DisciplinaContext);

    //    const [disciplina, setDisciplina] = useState<Disciplina[]>([]);

    //     useEffect(() => {
    //         axios.get(`${BASE_URL}/disciplina`)
    //             .then(response => {
    //                 setDisciplina(response.data);

    //                 console.log(response.data);
    //             });

    //     }, [])

    // useEffect(()=>{
    //     console.log(disciplina)
    // },[disciplina])

    return (
        <>

            <div className="table-responsive">

                {isLoading && <p>Loading...</p>}
                {fetchError && <p>{fetchError}</p>}
                {!isLoading && !fetchError && (disciplina.length ?
                    <table className="table table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disciplina?.map(item => (
                                <tr key={item.id} onClick={()=>handleClick!(item)}>
                                    <td >{item.nome}</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                    : <p>Sem disciplina para mostrar</p>)}





            </div>

        </>
    );
}

export default TableDisciplina;
