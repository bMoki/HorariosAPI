import error401 from "assets/img/Error401.png";

function Error401Message() {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div>
                <img src={error401} alt="Não há professor cadastrado" width="500" height="500"></img>
                            <h4 className="d-flex justify-content-center">{"Não autorizado" }</h4>
                </div>
            </div>
        </>
    )
}

export default Error401Message;