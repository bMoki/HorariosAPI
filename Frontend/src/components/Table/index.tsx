import axios from "axios";
import { ProfessorContext } from "contexts/ProfessorContext";
import { useContext, useEffect, useState} from "react";
import { ProfPage} from "types/prof";
import { BASE_URL } from "utils/requests";



function TableProf() {
    
    const {handleClick} = useContext(ProfessorContext);

    const [page, setPage] = useState<ProfPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(()=> {
        axios.get(`${BASE_URL}/professor`)
            .then(response => {
                setPage(response.data);
            });
    },[])

    return (
        <>
        
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
                            <tr key={item.id} onClick={()=>handleClick(item)}>
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
            
        </>
    );
}

export default TableProf;
