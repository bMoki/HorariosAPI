import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { DisciplinaContext } from "contexts/DisciplinaContext";





function FormDisciplina() {

    const { nome,nomeHandler,btnOperation,handleClear
    } = useContext(DisciplinaContext);


  
    return (
        <>
            <form className="row g-3" >
                <div className="col-6">
                    <label htmlFor="inputName" className="form-label" >Nome</label>
                    <input type="text" className="form-control" id="inputName" value={nome} onChange={nomeHandler}/>
                </div>
                <div className="row mt-3">
                    <div className="col-8 ">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" >{btnOperation ? "Alterar" : "Cadastrar"}</button>
                    </div>
                    <div className="col-2">
                        <button type="button"className={btnOperation ? "btn btn-danger" : "invisible"}  title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                    </div>
                    <div className="col-2">
                        <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear} ><AiOutlineClear/></button>
                    </div>
                </div>
            </form>
          
        </>
    );
};
export default FormDisciplina;
