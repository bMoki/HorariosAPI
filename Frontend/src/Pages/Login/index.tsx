import FormLogin from "components/Form/Login";

function LoginPage() {

    return (
        <>
            <div className="container h-100">
                <div className=' h-100 d-flex align-items-center justify-content-center'>
                    <div className="col-md-12 col-lg-4 col-sm-12 border shadow-sm  d-flex align-self-center justify-content-center h-40">

                        <div className='m-5 p-2 d-flex align-self-center justify-content-center'>
                            <FormLogin />
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default LoginPage;
