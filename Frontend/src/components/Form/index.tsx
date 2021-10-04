import { useContext } from "react";

import { ProfessorContext } from "contexts/ProfessorContext";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";





function Form() {

    const { nome, cpf, email, sobrenome, dataNascimento, siape,
        nomeHandler, sobrenomeHandler, cpfHandler, emailHandler, dataNascimentoHandler, siapeHandler,
        handleSubmit, btnOperation, handleClear, formIsOk
    } = useContext(ProfessorContext);


  
    return (
        <>
            <form className="row g-3" >
                <div className="col-6">
                    <label htmlFor="inputName" className="form-label">Nome</label>
                    <input type="text" className={ formIsOk ? "form-control" : nome!== "" ? "form-control" : "form-control is-invalid"} id="inputName" value={nome} onChange={nomeHandler} />
                </div>
                <div className="col-6">
                    <label htmlFor="inputSobrenome" className="form-label">Sobrenome</label>
                    <input type="text" className={ formIsOk ? "form-control" : sobrenome!== "" ? "form-control" : "form-control is-invalid"} id="inputSobrenome" value={sobrenome} onChange={sobrenomeHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCPF" className="form-label">CPF</label>
                    <input type="text" className={ formIsOk ? "form-control" : cpf!== "" ? "form-control" : "form-control is-invalid"} id="inputCPF" value={cpf} onChange={cpfHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputSIAPE" className="form-label">SIAPE</label>
                    <input type="text" className={ formIsOk ? "form-control" : siape!== "" ? "form-control" : "form-control is-invalid"} id="inputSIAPE" value={siape} onChange={siapeHandler} />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className={ formIsOk ? "form-control" : email!== "" ? "form-control" : "form-control is-invalid"} id="inputEmail" value={email} onChange={emailHandler} />
                </div>

                <div className="col-7">
                    <label htmlFor="inputData" className="form-label">Data de Nascimento</label>
                    <input  type="text" className="form-control" id="inputData"  value = {dataNascimento} onChange={dataNascimentoHandler}/>
                </div>
                <div className="row mt-3">
                    <div className="col-8 ">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" onClick={handleSubmit}>{btnOperation ? "Alterar" : "Cadastrar"}</button>
                    </div>
                    <div className="col-2">
                        <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir" data-bs-toggle="modal" data-bs-target="#exampleModal"><FiTrash2 /></button>
                    </div>
                    <div className="col-2">
                        <button type="submit" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={ handleClear }><AiOutlineClear/></button>
                    </div>
                </div>
            </form>
          
        </>
    );
};
export default Form;
