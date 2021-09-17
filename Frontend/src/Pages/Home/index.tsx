import Footer from "components/Footer";
import NavBar from "components/NavBar";

function Home() {
    return (
        <>
            <NavBar />
            <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <h1>Ola mundo</h1>
            </div>
            <Footer/>
        </>
    );
}

export default Home;
