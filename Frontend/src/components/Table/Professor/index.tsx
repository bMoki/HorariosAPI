import { ProfessorContext } from "contexts/ProfessorContext";
import { useContext} from "react";

function TableProf() {
    
    const {handleClick,page} = useContext(ProfessorContext);

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
                            <tr key={item.id} onClick={()=>handleClick!(item)}>
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
