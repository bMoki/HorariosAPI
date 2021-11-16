import error504 from "assets/img/Error504.png";

type IProps = {
    size: number;
}

function Error504Message({ size }: IProps) {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div>
                    <img src={error504} alt="Não há professor cadastrado" width={size} height={size}></img>
                    <h4 className="d-flex justify-content-center">{"Erro de conexão"}</h4>
                </div>
            </div>
        </>
    )
}

export default Error504Message;