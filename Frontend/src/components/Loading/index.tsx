type IProps = {
    margin:string;
    small?:boolean;
}

function LoadingSpinner({margin,small}:IProps) {
    return (
        <div className={`d-flex justify-content-center ${margin}`}>
            <div className={`spinner-border ${small?'spinner-border-sm':''}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner;