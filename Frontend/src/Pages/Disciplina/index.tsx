import ExportBtn from "components/Export";
import FormDisciplina from "components/Form/Disciplina";
import ImportBtn from "components/Import";
import ImportStatus from "components/ImportStatus";
import NavBar from "components/NavBar";
import Search from "components/Search";
import TableDisciplina from "components/Table/Disciplina";
import DisciplinaContextProvider from "contexts/DisciplinaContext";
import { LoginContext } from "contexts/LoginContext";
import { useSearch } from "hooks/useSearch";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Disciplina() {
    const { search, searchHandler, value } = useSearch();
    const { user } = useContext(LoginContext);
    return (
        <>
            <DisciplinaContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />

                    <div className="row d-flex justify-content-center">
                        <div className="row">
                            <div className="col-md-12 col-lg col-sm-12 p-3 pb-0 m-2 mt-4">
                                <h2>Disciplinas</h2>
                            </div>
                            <div className="col-md-6 col-lg col-sm-12  pt-3 pe-2 mt-4 ">
                                <Search search={search} searchHandler={searchHandler} />
                            </div>
                            {user?.admin &&
                                <div className="col-lg-5 border shadow-sm p-3  mt-4 m-2 d-flex justify-content-evenly">
                                    <div className="p-1 align-self-center">
                                        <ExportBtn dataUrl='disciplina?paged=false' fileName='DisciplinaReport' btnClassName='btn btn-success' id="btn-csv"
                                            headers={[
                                                { label: 'Nome', key: 'nome' },
                                                { label: 'Codigo Moodle', key: 'codMoodle' },
                                            ]}
                                        />
                                    </div>

                                    <div className="p-1 align-self-center">
                                        <ImportBtn
                                            dataUrl="disciplina"
                                            table={{
                                                titulos: ["nome", "codMoodle", "professor_cpf", "professor_nome"],
                                                exemplo: ["Matematica", "MAT123", "123.456.789-10", "Will Smith"]
                                            }}
                                            dicas={["Para que as disciplinas sejam associadas com o professor, deve-se antes importar professores"]}
                                        ></ImportBtn>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-lg col-md-12 col-sm-12 border shadow-sm p-3 pb-0   m-2 d-flex flex-column">
                                <TableDisciplina search={value} />
                            </div>
                            {user?.admin &&
                                <div className="col-lg-5 col-md-12 col-sm-12  m-2 ">
                                    <div className="row">
                                        <div className=" col border shadow-sm p-3 ">
                                            <FormDisciplina />
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <ImportStatus headers={[
                    { label: 'Nome', key: 'nome' },
                    { label: 'Codigo Moodle', key: 'codMoodle' },
                    { label: 'Professor Nome', key: 'professor_nome' },
                    { label: 'Professor CPF', key: 'professor_cpf' },
                    { label: 'Motivo', key: 'motivo' }
                ]}
                    naoExistem="Professores n??o encontrados"></ImportStatus>
            </DisciplinaContextProvider>
        </>
    );
}

export default Disciplina;
