import FormCurso from "components/Form/Curso";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import Pagination from "components/Pagination";
import TableCurso from "components/Table/Curso";
import CursoContextProvider from "contexts/CursoContext";
import { ToastContainer, Zoom } from "react-toastify";
import Toast from "utils/toasts";



function Cadastro_Curso() {
    window.onload = function () {
        Toast();
    }
    return (
        <>
            <CursoContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">



                        <div className="row">

                            <div className="col-lg-8 col-md-12 col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">

                                <div className="row">
                                    <TableCurso />
                                </div>
                                <div className="row mt-auto">
                                    <Pagination />
                                </div>

                            </div>

                            <div className="col-lg-3 col-md-12 col-sm-12  p-3 m-2 ">
                                <div className="row">
                                    <div className=" col border shadow-sm p-3">
                                        <FormCurso />
                                    </div>
                                </div>
                            </div>


                        </div>



                    </div>


                </div>
                <Modal message="Tem certeza que deseja excluir o curso?" context="curso" />
            </CursoContextProvider>

        </>
    );
}

export default Cadastro_Curso;
