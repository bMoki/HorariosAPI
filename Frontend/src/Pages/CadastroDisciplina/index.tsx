import FormDisciplina from "components/Form/Disciplina";

import Modal from "components/Modal";
import NavBar from "components/NavBar";

import TableDisciplina from "components/Table/Disciplina";
import TableProf from "components/Table/Professor";

import DisciplinaContextProvider from "contexts/DisciplinaContext";
import ProfessorContextProvider from "contexts/ProfessorContext";
import { ToastContainer, Zoom } from "react-toastify";



function Cadastro_Disciplina() {

    return (
        <>
            <DisciplinaContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">

                        <div className="col-8 ">

                            <div className="row">
                                <div className="col border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">

                                    <TableDisciplina />

                                </div>
                                <div className="col  border shadow-sm p-3 m-2 mt-4">
                                    <FormDisciplina />
                                </div>
                            </div>


                            <div className="row">
                                <div className="col border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                                   <ProfessorContextProvider><TableProf/></ProfessorContextProvider>
                                   </div>
                            </div>


                        </div>

                    </div>


                </div>
                <Modal message="Tem certeza que deseja excluir a disciplina?" context="disciplina" />
            </DisciplinaContextProvider>

        </>
    );
}

export default Cadastro_Disciplina;
