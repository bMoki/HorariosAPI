import FormDisciplina from "components/Form/Disciplina";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import TableDisciplina from "components/Table/Disciplina";
import DisciplinaContextProvider from "contexts/DisciplinaContext";
import { LoginContext } from "contexts/LoginContext";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { Toast } from "utils/storageManager";



function Disciplina() {
    window.onload = function () {
        Toast();
    }
    const { user } = useContext(LoginContext);
    return (
        <>
            <DisciplinaContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">



                        <div className="row">
                            <div className="col-lg col-md-12 col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                                <TableDisciplina />
                            </div>
                            {user?.isAdmin && <div className="col-lg-5 col-md-12 col-sm-12  p-3 m-2 ">
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
                <Modal message="Tem certeza que deseja excluir a disciplina?" context="disciplina" />
            </DisciplinaContextProvider>

        </>
    );
}

export default Disciplina;
