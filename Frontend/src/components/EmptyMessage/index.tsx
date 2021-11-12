import empty from "assets/img/Empty.gif";

type IProps = {
    text: string
}

function EmptyMessage({ text }: IProps) {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div>
                    <img src={empty} alt="Não há professor cadastrado"></img>
                    <h4 className="d-flex justify-content-center">{text}</h4>
                </div>
            </div>
        </>
    )
}

export default EmptyMessage;