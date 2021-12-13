/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import useApi from "hooks/useApi";
import { useState } from "react";
import { useRef } from "react";
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
type headers = {
    label:string,
    key:string
}

type IProps = {
    dataUrl: string,
    fileName: string,
    btnClassName: string,
    id: string,
    headers:headers[]
}
function ExportBtn({ dataUrl, fileName, btnClassName, id , headers}: IProps) {

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

    return (
        <>

            <button className={btnClassName} onClick={fetchData}> {isLoading ? <div className="d-flex justify-content-center" id={id}>
                <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : <div className="d-flex px-1">Exportar<FaDownload  className="ms-3 mt-1"/></div>}</button>



            <CSVLink
                filename={`${fileName}.csv`}
                data={data}
                ref={btnRef}
                className="invisible"
                headers={headers}
                onClick={() => {
                    if (data.length === 0) {
                        toast.error(fetchError ? fetchError : "Documento vazio!")
                        return false;
                    }
                }}
            >
            </CSVLink>
        </>
    )

}

export default ExportBtn;