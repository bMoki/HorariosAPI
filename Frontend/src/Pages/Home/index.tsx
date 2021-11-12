import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { LoginContext } from "contexts/LoginContext";
import { useContext } from "react";

function Home() {
    const { user } = useContext(LoginContext);

    return (
        <>
            <NavBar />
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1>{user?.sub}</h1>
            </div>
            <Footer />
        </>
    );
}

export default Home;
