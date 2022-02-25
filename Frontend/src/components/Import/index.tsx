/* eslint-disable react-hooks/exhaustive-deps */

import LoadingSpinner from "components/Loading";
import { LoginContext } from "contexts/LoginContext";
import useApi from "hooks/useApi";
import { useContext, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

type Table = {
    titulos: string[],
    exemplo:string[]
}
type IProps = {
    dataUrl: string,
    disabled?: boolean,
    table:Table,
    dicas?: string[],
}
function ImportBtn({ dataUrl, disabled, dicas, table }: IProps) {


    const api = useApi();

    const { loadingSubmit } = useContext(LoginContext);

    const bodyFormData = new FormData();

    function submitFile() {
        if (file) {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            bodyFormData.append('file', file);
            api.post(`/${dataUrl}/upload`, bodyFormData, config);

        } else {
            toast.warn("Escolha um arquivo!");
        }

    }

    const [file, setFile] = useState<File | null>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files ? e.target.files[0] : null);
    }
    const btnRef = useRef<any>();
  
    return (
        <>

            <button ref={btnRef} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalImportacao">
                <div className="d-flex px-1">Importar <FaUpload className="ms-3 mt-1" /></div>
            </button>

            <div className="modal fade " id="ModalImportacao" tabIndex={-1} aria-labelledby="ModalImportacaoLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered modal-xl">

                    <div className="modal-content">
                        <div className="modal-body">


                            <div className="container p-3">

                                <div className="row">
                                <div className="d-flex justify-content-center">
                                        <div className="fs-1 ms-auto">ATENÇÃO</div>
                                        <button type="button" className="btn-close ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                </div>
                                <div className="row mt-5 mb-4">
                                    <div className="col-12 d-flex justify-content-center">
                                        <div className="fs-3">Segue a tabela exemplo para a importação de {dataUrl}s</div>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12 d-flex justify-content-center">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    {table.titulos.map((titulo,i)=>(
                                                        <th scope="col" key={i}>{titulo}</th>    
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {table.exemplo.map((exemplo,i)=>(
                                                         <td key={i}>
                                                            {
                                                                i===0 || i===1 ? 
                                                                <b>{exemplo}</b>
                                                                :
                                                                exemplo
                                                            }
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <ul>
                                            <li className="fs-6">Todos os titulos propostos devem estar na planilha</li>
                                            <li className="fs-6">Os campos em negrito não podem estar vazios ao mesmo tempo</li>
                                            <li className="fs-6">Caso algum campo em negrito esteja vazio o sistema irá verificar sua existência e caso verdadeira atualiza-lo</li>
                                            <li className="fs-6">Se a planilha possuir colunas adicionais, tais simplesmente não serão detectadas pelo sistema</li>
                                            {dicas?.map((dica,i)=>(
                                                 <li className="fs-6" key={i}>{dica}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col d-flex justify-content-center">
                                        {loadingSubmit ? <LoadingSpinner margin="m-1" /> :
                                            <>
                                                <label htmlFor="file-upload" className={`btn btn-primary btn-lg ${disabled ? "disabled" : ""}`} data-bs-toggle="tooltip" title={file?.name}>
                                                    {file?.name ? file.name : "Selecionar"}
                                                </label>

                                                <input id="file-upload" type="file" className="invisible" onChange={(e) => handleFile(e)} style={{ width: "1px" }} accept=".csv" />
                                            </>
                                        }

                                    </div>

                                </div>


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-success" onClick={submitFile} disabled={file ? false : true}><div className="d-flex px-1">Enviar <FaUpload className="ms-3 mt-1" /></div></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ImportBtn;