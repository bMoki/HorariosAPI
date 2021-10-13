import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { DisciplinaContext } from "contexts/DisciplinaContext";
import ComboBoxProf from "components/ComboBox/Professor";





function FormDisciplina() {

    const { nome, nomeHandler, btnOperation, handleClear,handleSubmit,formIsOk
    } = useContext(DisciplinaContext);



    return (
        <>
            <form className="row g-3" >
                <div className="col">
                    <label htmlFor="inputName" className="form-label" >Nome</label>
                    <input type="text" className={formIsOk ? "form-control" : nome !== "" ? "form-control" : "form-control is-invalid"} id="inputName" value={nome} onChange={nomeHandler} />
                </div>


                <div className="col">
                    <ComboBoxProf />
                </div>



                <div className=" d-flex">
                    <div className="me-auto p-2">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" onClick={handleSubmit}>{btnOperation ? "Alterar" : "Cadastrar"}</button>
                    </div>
                    <div className="p-2 ">
                        <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                    </div>
                    <div className="p-2">
                        <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear} ><AiOutlineClear /></button>
                    </div>
                </div>

            </form>

        </>
    );
};
export default FormDisciplina;
