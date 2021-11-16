import FormUsuario from "components/Form/Usuario";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import TableUsuario from "components/Table/Usuario";
import { LoginContext } from "contexts/LoginContext";
import UsuarioContextProvider from "contexts/UsuarioContext";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Usuario() {
    const { user } = useContext(LoginContext);

    return (
        <>
            <UsuarioContextProvider>

                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">

                        <div className="row">
                            <div className="col-md-12 col-lg col-sm-12 border shadow-sm p-3 pb-0  mt-2 m-2 d-flex flex-column">
                                <TableUsuario />
                            </div>

                            {user?.admin && <div className="col-lg-4  p-3  mt-2 m-2">
                                <div className="row">
                                    <div className=" col border shadow-sm p-3">
                                        <FormUsuario />
                                    </div>
                                </div>
                            </div>}


                        </div>
                    </div>



                </div>
                <Modal message="Tem certeza que deseja excluir o aluno?" context="aluno" />
            </UsuarioContextProvider>
        </>
    );
}

export default Usuario;
