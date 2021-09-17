import Footer from "components/Footer";
import Form from "components/Form";
import NavBar from "components/NavBar";
import TableProf from "components/Table";

function Cadastro_Prof() {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col  border shadow-sm p-3 m-2">
                        <TableProf />
                    </div>
                </div>
                <div className="row">
                    <div className="col border shadow-sm p-3  mt-4 m-2">
                        <Form />
                    </div>
                    <div className="col border shadow-sm p-3  mt-4 m-2">
                        <Form />
                    </div>
                </div>
            </div>
         
        </>
    );
}

export default Cadastro_Prof;
