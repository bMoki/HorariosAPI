/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import useApi from "hooks/useApi";
import { useState } from "react";
import { useRef } from "react";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";

type IProps={
    dataUrl: string,
    fileName: string,
    type:string,
    btnClassName:string
}
function ExportBtn({dataUrl,fileName,type,btnClassName}:IProps) {

    //const dataUrl = `professor?paged=false`;
    const api = useApi();
    const btnRef = useRef<any>();
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);



    const fetchData = async () => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        setIsLoading(true);
        try {
            const response = await api.get(dataUrl, {
                cancelToken: source.token
            });

            if (isMounted) {
                setData(response.data.content);
                setFetchError(null)
            }
        } catch (err: any) {
            if (isMounted) {
                setFetchError(err.message);
                setData([]);
            }
        } finally {
            isMounted && setIsLoading(false);
             
        }

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        btnRef.current!.link.click();
        return cleanUp;
    }



    const headers = [
        { label: 'Nome', key: 'nome' },
        { label: 'Sobrenome', key: 'sobrenome' },
        { label: 'CPF', key: 'cpf' },
        { label: 'Siape', key: 'siape' },
        { label: 'Data de Nascimento', key: 'dataNascimento' }
    ];
    return (
        <>
            <button className={btnClassName} onClick={fetchData}> {isLoading ? <div className="d-flex justify-content-center">
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : type}</button>

            <CSVLink
                filename={`${fileName}${type}`}
                data={data}
                ref={btnRef}
                className="invisible"
                headers={headers}
                onClick={() => {
                    if (data.length === 0) {
                        toast.error(fetchError ? fetchError :"Não há professor!")
                        return false;
                    }
                }}
            >
            </CSVLink>
        </>
    )

}

export default ExportBtn;