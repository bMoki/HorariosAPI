import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { LoginContext } from "contexts/LoginContext";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { UserDetail } from "types/user";
import { Toast } from "utils/storageManager";
import Error504Message from "components/Error/Error504Message";

function Home() {
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


            <div className="container">
                <div className="col-md-9 col-lg-12 px-md-4">
                    {isLoading &&
                        <div className="d-flex justify-content-center mt-5 mb-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                    {fetchError && <>
                        <Error504Message size={500}/>

                    </>}
                    {!isLoading && !fetchError ? <h1>{userDetail?.name}</h1> : ""}


                </div>


            </div>
            <Footer />
        </>
    );
}

export default Home;
