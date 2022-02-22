import FormCurso from "components/Form/Curso";
import NavBar from "components/NavBar";
import Search from "components/Search";
import TableCurso from "components/Table/Curso";
import CursoContextProvider from "contexts/CursoContext";
import { LoginContext } from "contexts/LoginContext";
import { useSearch } from "hooks/useSearch";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Curso() {
    const { user } = useContext(LoginContext);
    const { search, searchHandler, value } = useSearch();
    return (
        <>
            <CursoContextProvider>
                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">
                        <div className="row">
                            <div className="col-lg col-md-12 col-sm-12  p-3 pb-0  mt-4">
                                <h2>Cursos</h2>
                            </div>

                            <div className="col-lg-3 col-md-12 col-sm-12  pt-4 pb-0 me-4">
                                <div className="row">
                                    <div className="col  pt-3 ">
                                        <Search search={search} searchHandler={searchHandler} />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg col-md-12 col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                                    <TableCurso search={value} />
                                </div>
                                {user?.admin && <div className="col-lg-3 col-md-12 col-sm-12  p-3 m-2 ">
                                    <div className="row">
                                        <div className=" col border shadow-sm p-3">
                                            <FormCurso />
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </CursoContextProvider>
        </>
    );
}

export default Curso;
