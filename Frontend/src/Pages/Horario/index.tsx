import ComboBoxCurso from "components/ComboBox/Curso";
import ComboBoxTurma from "components/ComboBox/Turma";
import FormHorario from "components/Form/Horario";
import NavBar from "components/NavBar";
import TableHorario from "components/Table/Horario";
import HorarioContextProvider from "contexts/HorarioContext";
import { LoginContext } from "contexts/LoginContext";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";


function Horario() {
    const { user } = useContext(LoginContext);
    return (
        <>
            <HorarioContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">
                        <div className="row">
                            <h2>Horários</h2>
                            <div className="col-lg-4 col-md-12 col-sm-12  p-3 m-2 ">
                                <div className="row">
                                    <div className=" col border shadow-sm p-3">
                                        <form className="row g-3" >

                                            <div className="col-12">
                                                <ComboBoxCurso />
                                            </div>
                                            <div className="col-12">
                                                <ComboBoxTurma />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {user?.admin ?
                                <div className="col  p-3 m-2 ">
                                    <div className="row">
                                        <div className=" col border shadow-sm p-3">
                                            <FormHorario />
                                        </div>
                                    </div>
                                </div>
                                : ""}
                            <div className="row">
                                <TableHorario />
                            </div>
                        </div>
                    </div>
                </div>
               
            </HorarioContextProvider>

        </>
    );
}

export default Horario;
