import FormDisciplina from "components/Form/Disciplina";
import NavBar from "components/NavBar";
import TableDisciplina from "components/Table/Disciplina";
import DisciplinaContextProvider from "contexts/DisciplinaContext";
import { LoginContext } from "contexts/LoginContext";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Disciplina() {

    const { user } = useContext(LoginContext);
    return (
        <>
            <DisciplinaContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">
                        <div className="row">
                            <h2>Disciplinas</h2>
                            <div className="col-lg col-md-12 col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                                <TableDisciplina />
                            </div>
                            {user?.admin && <div className="col-lg-5 col-md-12 col-sm-12 p-3 m-2 ">
                                <div className="row">
                                    <div className=" col border shadow-sm p-3">
                                        <FormDisciplina />
                                    </div>
                                </div>
                            </div>
                            }

                        </div>
                    </div>
                </div>
               
            </DisciplinaContextProvider>
        </>
    );
}

export default Disciplina;
