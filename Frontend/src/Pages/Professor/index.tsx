import ExportBtn from "components/Export";
import FormProf from "components/Form/Professor";
import ImportBtn from "components/Import";
import ImportStatus from "components/ImportStatus";
import NavBar from "components/NavBar";
import Search from "components/Search";
import TableProf from "components/Table/Professor";
import { LoginContext } from "contexts/LoginContext";
import ProfessorContextProvider from "contexts/ProfessorContext";
import { useSearch } from "hooks/useSearch";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Professor() {
    const { user } = useContext(LoginContext);
    const {search, searchHandler} = useSearch();


    return (
        <>
            <ProfessorContextProvider>

                <NavBar />
                <div className="container">

                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    
                    <div className="row">
                        <div className="col-md-6 col-lg col-sm-12 p-3 pb-0 m-2 mt-4">
                            <h2>Professores</h2>
                        </div>
                      
                        <div className="col-md-6 col-lg col-sm-12  pt-3 pe-2 mt-4 ">
                            <Search search={search} searchHandler={searchHandler}/>
                        </div>
              
                        <div className="col-lg-4 border shadow-sm p-3  mt-4 m-2 d-flex justify-content-evenly">
                            <div className="p-1 align-self-center">
                                <ExportBtn dataUrl='professor?paged=false' fileName='ProfessorReport' btnClassName='btn btn-success' id="btn-csv" 
                                 headers={[
                                    { label: 'Nome', key: 'nome' },
                                    { label: 'Sobrenome', key: 'sobrenome' },
                                    { label: 'CPF', key: 'cpf' },
                                    { label: 'Siape', key: 'siape' },
                                    { label: 'Email', key: 'email'},
                                    { label: 'Data de Nascimento', key: 'dataNascimento' }
                                ]}
                                />
                            </div>

                            <div className="p-1 align-self-center">
                                <ImportBtn dataUrl="professor"
                                    table={{
                                        titulos:["nome","cpf","siape","dataNascimento","email"],
                                        exemplo:["Will Smith","123.456.789-10","12345","1990-04-03","will@edu.br"]
                                    }}
                                  
                                ></ImportBtn>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        <div className="col-md-12 col-lg col-sm-12 border shadow-sm p-3 pb-0 m-2 d-flex flex-column">
                            <TableProf search={search}/>
                        </div>

                        {user?.admin &&
                            <div className="col-lg-4 border shadow-sm p-3 m-2">
                                <FormProf />
                            </div>
                        }

                    </div>
                </div>
            <ImportStatus headers={[
                                    { label: 'Nome', key: 'nome' },
                                    { label: 'CPF', key: 'cpf' },
                                    { label: 'Siape', key: 'siape' },
                                    { label: 'Email', key: 'email'},
                                    { label: 'Data de Nascimento', key: 'dataNascimento' },
                                    { label: 'Motivo', key: 'motivo' }
                                ]}
                                naoExistem="Professores não encontrados"></ImportStatus>
            </ProfessorContextProvider>
        </>
    );
}

export default Professor;
