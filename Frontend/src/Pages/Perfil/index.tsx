import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { LoginContext } from "contexts/LoginContext";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { UserDetail } from "types/user";
import { Toast } from "utils/storageManager";
import Error504Message from "components/Error/Error504Message";
import FormUsuario from "components/Form/Usuario";
import UsuarioContextProvider from "contexts/UsuarioContext";

function Perfil() {
    const { user } = useContext(LoginContext);
    const { data, fetchError, isLoading } = useAxiosFetchById(`/usuario/info/${user?.sub}`);
    const [userDetail, setUserDetail] = useState<UserDetail>({});

    useEffect(() => {
        setUserDetail(data);
    }, [data])

    useEffect(() => {
        Toast();
    }, [])

    return (
        <>
            <NavBar />
            <ToastContainer draggable={false} transition={Zoom} autoClose={5000} />

            <UsuarioContextProvider>
                <div className="container">
                    <div className="col-md-9 col-lg-12 px-md-4">
                        {isLoading &&
                            <div className="d-flex justify-content-center mt-5 mb-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                        {fetchError && <>
                            <Error504Message size={500} />

                        </>}
                        {!isLoading && !fetchError ?
                            <>
                                <div className="row">
                                    <div className="col-lg-3 border-end mb-5 me-5">
                                        <h1>{userDetail?.name} </h1>
                                        <h2>{userDetail.admin ?
                                            <span className="badge bg-primary">Admin</span>
                                            :
                                            <span className="badge bg-dark">Usuário</span>
                                        }</h2>
                                        <p className="fs-4 text-muted">{userDetail.username}</p>
                                    </div>

                                    <div className="col ">
                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <FormUsuario User={userDetail} />
                                        </div>
                                    </div>
                                </div>
                            </>
                            : ""}


                    </div>


                </div>
            </UsuarioContextProvider>
            <Footer />
        </>
    );
}

export default Perfil;
