import FormLogin from "components/Form/Login";
import LoginImg from "assets/img/Login.png"

function LoginPage() {

    return (
        <>
            <div className="container h-100">
                <div className="row align-items-center  h-100">
                    <div className="col-12 mx-auto ">

                        <div className="row p-3 d-flex justify-content-center flex-row-reverse">

                            <div className="col-lg-4 col-md-8 col-sm-12 border shadow-sm d-flex justify-content-center">
                                <div className='m-5 p-2 '>
                                    <FormLogin />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
                                <img src={LoginImg} alt="Login" width={400} height={400} />
                            </div>
                        </div>


                    </div>
                </div>

            </div>

        </>
    );
}

export default LoginPage;
