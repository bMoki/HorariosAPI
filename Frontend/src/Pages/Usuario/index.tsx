import FormUsuario from "components/Form/Usuario";
import NavBar from "components/NavBar";
import Search from "components/Search";
import TableUsuario from "components/Table/Usuario";
import { LoginContext } from "contexts/LoginContext";
import UsuarioContextProvider from "contexts/UsuarioContext";
import { useSearch } from "hooks/useSearch";
import { useContext } from "react";
import { ToastContainer, Zoom } from "react-toastify";

function Usuario() {
    const { user } = useContext(LoginContext);
    const { search, searchHandler } = useSearch();

    return (
        <>
            <UsuarioContextProvider>

                <NavBar />
                <div className="container">
                    <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />
                    <div className="row d-flex justify-content-center">
                        <div className="row">
                            <div className="col-md-12 col-lg col-sm-12 p-3 pb-0 m-2 mt-4">
                                <h2>Usuários</h2>
                            </div>
                            <div className="col-md-6 col-lg col-sm-12   pt-3 pe-2 mt-4 me-1">
                               
                            </div>
                            <div className="col-md-6 col-lg-4 col-sm-12   pt-3 mt-4">
                            <Search search={search} searchHandler={searchHandler} />   
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-lg col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                                <TableUsuario search={search} />
                            </div>

                            {user?.admin && <div className="col-lg-4  p-3  mt-2 m-2">
                                <div className="row">
                                    <div className=" col border shadow-sm p-3">
                                        <FormUsuario User={undefined} />
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>



                </div>

            </UsuarioContextProvider>
        </>
    );
}

export default Usuario;
