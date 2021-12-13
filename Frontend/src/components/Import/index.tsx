/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { LoginContext } from "contexts/LoginContext";
import useApi from "hooks/useApi";
import { useContext, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";


type IProps = {
    dataUrl: string,
    btnClassName: string,
    disabled?: boolean
}
function ImportBtn({ dataUrl, btnClassName,disabled }: IProps) {


    const api = useApi();

    const { loadingSubmit } = useContext(LoginContext);

    const bodyFormData = new FormData();

    function submitFile(){
        if(file){
            const config ={
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            bodyFormData.append('file',file);
            api.post("/professor/upload",bodyFormData,config);
        }else{
            toast.warn("Escolha um arquivo!");
        }
       
    }

    const [file, setFile] = useState<File | null>(null);

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files ? e.target.files[0] : null);
    }

    return (
        <>
            <div className="btn-group">
                <label htmlFor="file-upload" className={`btn btn-primary ${disabled?"disabled":""}`}>
                    {file?.name ? file.name : "Importar"}
                </label>
                <button type="button" className="btn btn-info" onClick={submitFile} disabled={file ? false : true}>
                    <span className=""><FaUpload className="text-light"/></span>
                </button>
                <input id="file-upload" type="file" className="invisible" onChange={(e) => handleFile(e)} style={{width:"1px"}} accept=".csv"/>
            </div>



        </>
    )

}

export default ImportBtn;