import ExportBtn from "components/Export";
import FormAluno from "components/Form/Aluno";
import ImportBtn from "components/Import";
import ImportStatus from "components/ImportStatus";
import NavBar from "components/NavBar";
import Search from "components/Search";
import TableAluno from "components/Table/Aluno";
import AlunoContextProvider from "contexts/AlunoContext";
import { LoginContext } from "contexts/LoginContext";
import { useSearch } from "hooks/useSearch";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Aluno() {
    const { user } = useContext(LoginContext);
    const { search, searchHandler, value } = useSearch();
    return (
        <>
            <AlunoContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />

                    <div className="row">
                        <div className="col-md-12 col-lg col-sm-12 p-3 pb-0 m-2 mt-4">
                            <h2>Alunos</h2>
                        </div>
                        <div className="col-md-6 col-lg col-sm-12  pt-3 pe-2 mt-4 ">
                            <Search search={search} searchHandler={searchHandler} />
                        </div>
                        {user?.admin && 
                        
                        <div className="col border shadow-sm p-3  mt-4 m-2 d-flex justify-content-evenly">
                        <div className="p-1 align-self-center">
                            <ExportBtn dataUrl='aluno?paged=false' fileName='AlunoReport' btnClassName='btn btn-success' id="btn-csv"
                                headers={[
                                    { label: 'Nome', key: 'nome' },
                                    { label: 'CPF', key: 'cpf' },
                                    { label: 'Matricula', key: 'matricula' },
                                    { label: 'Data de Inclusão', key: 'dataInclusao' },
                                    { label: 'Data de Inativação', key: 'dataInativacao' }
                                ]}
                            />
                        </div>

                        <div className="p-1 align-self-center">
                            <ImportBtn
                                dataUrl="aluno"
                                table={{
                                    titulos: ["nome", "cpf", "matricula", "email", "disciplina_cod", "disciplina_nome"],
                                    exemplo: ["aluno ifrs", "123.456.789-10", "12345", "aluno@gmail.com", "COD12", "disciplina1"]
                                }}
                                dicas={["Para que os alunos sejam associados com a disciplina, deve-se antes importar disciplinas"]}

                            ></ImportBtn>

                        </div>

                    </div>

                        
                        
                        }
                       
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg col-sm-12 border shadow-sm p-3 pb-0 m-2 d-flex flex-column">
                            <TableAluno search={value} />
                        </div>
                        {user?.admin &&
                            <div className=" col-lg-4 border shadow-sm p-3 m-2">
                                <FormAluno />
                            </div>


                        }


                    </div>
                </div>
                <ImportStatus headers={[
                    { label: 'Nome', key: 'nome' },
                    { label: 'CPF', key: 'cpf' },
                    { label: 'Matricula', key: 'matricula' },
                    { label: 'Codigo Disciplina', key: 'disciplina_cod' },
                    { label: 'Nome Disciplina', key: 'disciplina_nome' },
                    { label: 'Motivo', key: 'motivo' }
                ]}
                    naoExistem="Disciplinas não encontradas"></ImportStatus>
            </AlunoContextProvider>
        </>
    );
}

export default Aluno;
