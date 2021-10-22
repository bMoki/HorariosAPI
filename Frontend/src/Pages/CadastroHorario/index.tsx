import FormHorario from "components/Form/Horario";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import TableHorario from "components/Table/Horario";
import HorarioContextProvider from "contexts/HorarioContext";
import { ToastContainer, Zoom } from "react-toastify";
import Toast from "utils/toasts";



function Cadastro_Horario() {
    window.onload = function () {
        Toast();
    }
    return (
        <>
            <HorarioContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">



                        <div className="row">



                            <div className="col-lg-5 col-md-12 col-sm-12  p-3 m-2 ">
                                <div className="row">
                                    <div className=" col border shadow-sm p-3">
                                        <FormHorario />
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <TableHorario />
                            </div>



                        </div>



                    </div>


                </div>
                <Modal message="Tem certeza que deseja excluir o horário?" context="horario" />
            </HorarioContextProvider>

        </>
    );
}

export default Cadastro_Horario;