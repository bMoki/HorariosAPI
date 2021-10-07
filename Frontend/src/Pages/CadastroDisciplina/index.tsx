import FormDisciplina from "components/Form/Disciplina";

import Modal from "components/Modal";
import NavBar from "components/NavBar";

import TableDisciplina from "components/Table/Disciplina";

import DisciplinaContextProvider from "contexts/DisciplinaContext";
import { ToastContainer, Zoom } from "react-toastify";



function Cadastro_Disciplina() {

    return (
        <>
            <DisciplinaContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />

                    <div className="row">
                        <div className="col-md-6 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                            <div className="row">
                                <TableDisciplina />
                            </div>
                        </div>

                        <div className="col border shadow-sm p-3  mt-4 m-2">
                            <FormDisciplina />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-8  border shadow-sm p-3 m-2">

                        </div>
                    </div>


                </div>
                <Modal />
            </DisciplinaContextProvider>

        </>
    );
}

export default Cadastro_Disciplina;
