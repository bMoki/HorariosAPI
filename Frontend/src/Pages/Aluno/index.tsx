import FormAluno from "components/Form/Aluno";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import TableAluno from "components/Table/Aluno";
import AlunoContextProvider from "contexts/AlunoContext";
import { LoginContext } from "contexts/LoginContext";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Aluno() {
    const { user } = useContext(LoginContext);

    return (
        <>
            <AlunoContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">
                        <div className="row">
                            <h2>Alunos</h2>
                            <div className="col-md-12 col-lg col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                                <TableAluno />
                            </div>
                            {user?.admin && <div className="col-lg-4 col-md-12 col-sm-12 p-3 m-2">
                                <div className="row">
                                    <div className=" col border shadow-sm p-3">
                                        <FormAluno />
                                    </div>
                                </div>
                            </div>}


                        </div>
                    </div>



                </div>
                <Modal message="Tem certeza que deseja excluir o aluno?" context="aluno" />
            </AlunoContextProvider>
        </>
    );
}

export default Aluno;
