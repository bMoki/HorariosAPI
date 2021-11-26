import FormProf from "components/Form/Professor";
import NavBar from "components/NavBar";
//import SearchProf from "components/Search/Professor";
import TableProf from "components/Table/Professor";
import { LoginContext } from "contexts/LoginContext";
import ProfessorContextProvider from "contexts/ProfessorContext";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Professor() {
    const { user } = useContext(LoginContext);
    return (
        <>
            <ProfessorContextProvider>

                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    {/* <div className="row">
                        <div className="col-md-12 col-lg-7 col-sm-12  border shadow-sm p-3 m-2 mt-4">
                            <SearchProf />
                        </div>
                    </div> */}
                    <div className="row">
                        <h2>Professores</h2>
                        <div className="col-md-12 col-lg col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                            <TableProf />
                        </div>
                        {user?.admin &&
                            <div className="col-lg-4 border shadow-sm p-3  mt-4 m-2">
                                <FormProf />
                            </div>
                        }


                    </div>



                </div>
               
            </ProfessorContextProvider>
        </>
    );
}

export default Professor;
