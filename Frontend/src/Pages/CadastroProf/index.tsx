import Form from "components/Form";
import Modal from "components/Modal";
import NavBar from "components/NavBar";
import Pagination from "components/Pagination";
import TableProf from "components/Table";
import { ProfessorContextProvider } from "contexts/ProfessorContext";



function Cadastro_Prof() {
    
    return (
        <>
        <ProfessorContextProvider>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-md-8 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                        <div className="row">
                            <TableProf />
                        </div>
                        <div className="row mt-auto">
                            <Pagination />
                        </div>
                    </div>
                   
                    <div className="col border shadow-sm p-3  mt-4 m-2">
                        <Form/>
                    </div>

                </div>
                <div className="row">
                    <div className="col  border shadow-sm p-3 m-2">
                        <TableProf/>
                    </div>
                </div>

            </div>
            <Modal/>
        </ProfessorContextProvider>
        </>
    );
}

export default Cadastro_Prof;
