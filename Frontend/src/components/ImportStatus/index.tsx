/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
type Headers = {
    label: string,
    key: string
}
type IProps = {
    headers: Headers[]
    naoExistem: string
}
type Status = {
    inseridas: number;
    atualizadas: number;
    erros: number;
    naoExistem: number;
    file: any;
}
function ImportStatus({ headers, naoExistem }: IProps) {
    const [status, setStatus] = useState<null | Status>(null);
    const [data, setData] = useState<any>([]);
    const [showDownload, setShowDownload] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("response")) {
            const resString = sessionStorage.getItem("response");
            const res = JSON.parse(resString!);
            res.data && setStatus(res.data);
            res.data.file && setData(res.data.file);
            sessionStorage.removeItem("response");
        }else{
            setData([]);
            setStatus(null);
        }
    }, [])

    const btnModal = useRef<any>();
    const btnDownload = useRef<any>();

    useEffect(() => {
        status && status.erros !== 0 ? setShowDownload(true) : status?.naoExistem !== 0 ? setShowDownload(true) : setShowDownload(false);
        status && btnModal.current?.click();
    }, [status, data])

    return (
        <>
            <button ref={btnModal} type="button" className="invisible" data-bs-toggle="modal" data-bs-target="#ModalImportacaoStatus">
            </button>

            <div className="modal fade " id="ModalImportacaoStatus" tabIndex={-1} data-bs-backdrop="static" aria-labelledby="ModalImportacaoStatusLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-xl">

                    <div className="modal-content">
                        <div className="modal-body">


                            <div className="container p-3">

                                <div className="row">
                                    <div className="d-flex ">
                                        <div className="fs-1 ms-auto">STATUS DA IMPORTAÇÃO</div>
                                        <button type="button" className="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>

                                </div>

                                <div className="row my-5">
                                    <div className="col d-flex justify-content-center">
                                        <table className="table table-borderless table-status">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="fs-4">Incluidos</th>
                                                    <th scope="col" className="fs-4">Atualizados</th>
                                                    <th scope="col" className="fs-4">Erros</th>
                                                    <th scope="col" className="fs-4">{naoExistem}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className="text-success fs-4">{status ? status.inseridas : 0}</th>
                                                    <th className="text-success fs-4">{status ? status.atualizadas : 0}</th>
                                                    <th className="text-danger fs-4">{status ? status.erros : 0}</th>
                                                    <th className="text-warning fs-4">{status ? status.naoExistem : 0}</th>


                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {showDownload ?
                                    <>
                                        <div className="row">
                                            <div className="col d-flex justify-content-center">
                                                <div className="fs-5">Deseja baixar uma planilha com as linhas que deram errado?</div>
                                            </div>

                                        </div>
                                        <div className="row mt-5">
                                            <div className="col d-flex justify-content-end">
                                                <button type="button" className="btn btn-secondary btn-lg" data-bs-dismiss="modal">Cancelar</button>
                                            </div>

                                            <div className="col d-flex justify-content-start">
                                                <button className="btn btn-success btn-lg" onClick={() => btnDownload.current!.link.click()}>  <div className="d-flex px-1">Baixar <FaDownload className="ms-3 mt-1" /></div></button>
                                            </div>


                                        </div></>
                                    : ""}




                                <CSVLink
                                    filename={`linhasErradas.csv`}
                                    ref={btnDownload}
                                    data={data && data}
                                    className="invisible"
                                    headers={headers}
                                    onClick={() => {
                                        if (data.length === 0) {
                                            toast.error("Documento vazio!")
                                            return false;
                                        }
                                    }}
                                >
                                </CSVLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ImportStatus;