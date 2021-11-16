import Footer from "components/Footer";
import NavBar from "components/NavBar";
import Error401Message from "components/Error/Error401Message";

function Unauthorized() {
    return (
        <>
            <NavBar />
            <div className="col-md-9 col-lg-12 px-md-4">
                <Error401Message />
            </div>
            <Footer />
        </>
    );
}

export default Unauthorized;
