import FormAluno from "components/Form/Aluno";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import TableAluno from "components/Table/Aluno";
import AlunoContextProvider from "contexts/AlunoContext";
import { LoginContext } from "contexts/LoginContext";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Toast } from "utils/storageManager";



function Aluno() {
    window.onload = function () {
        Toast();
    }
    const { user } = useContext(LoginContext);

    return (
        <>
            <AlunoContextProvider>

                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />

                    <div className="row">
                        <div className="col-md-12 col-lg col-sm-12 border shadow-sm p-3 pb-0  mt-2 m-2 d-flex flex-column">
                            <TableAluno />
                        </div>
                        {user?.isAdmin && <div className="col-lg-4 border shadow-sm p-3  mt-2 m-2">
                            <FormAluno />
                        </div>
                        }


                    </div>



                </div>
                <Modal message="Tem certeza que deseja excluir o aluno?" context="aluno" />
            </AlunoContextProvider>
        </>
    );
}

export default Aluno;
