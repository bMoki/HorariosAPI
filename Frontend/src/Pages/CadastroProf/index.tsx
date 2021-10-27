import FormProf from "components/Form/Professor";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import Pagination from "components/Pagination";
import SearchProf from "components/Search/Professor";
import TableProf from "components/Table/Professor";
import ProfessorContextProvider from "contexts/ProfessorContext";
import { ToastContainer, Zoom } from "react-toastify";
import { Toast } from "utils/storageManager";



function Cadastro_Prof() {
    window.onload = function () {
        Toast();
    }

    return (
        <>
            <ProfessorContextProvider>

                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row">
                        <div className="col-md-12 col-lg-7 col-sm-12  border shadow-sm p-3 m-2 mt-4">
                            <SearchProf />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-7 col-sm-12 border shadow-sm p-3 pb-0  mt-2 m-2 d-flex flex-column">
                            <div className="row">
                                <TableProf />
                            </div>
                            <div className="row mt-auto">
                                <Pagination />
                            </div>
                        </div>

                        <div className="col-lg-4 border shadow-sm p-3  mt-2 m-2">
                            <FormProf />
                        </div>

                    </div>



                </div>
                <Modal message="Tem certeza que deseja excluir o professor?" context="professor" />
            </ProfessorContextProvider>
        </>
    );
}

export default Cadastro_Prof;
