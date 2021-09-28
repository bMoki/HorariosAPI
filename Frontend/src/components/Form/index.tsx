import { useContext } from "react";
import { ProfessorContext } from "contexts/ProfessorContext";
//import { VscTrash } from "react-icons/vsc";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";


function Form() {

    const { nome, cpf, email, sobrenome,
        nomeHandler, sobrenomeHandler, cpfHandler, emailHandler,
        handleSubmit, btnOperation, handleClear
    } = useContext(ProfessorContext);

    return (
        <>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-6">
                    <label htmlFor="inputName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="inputName" value={nome} onChange={nomeHandler} />
                </div>
                <div className="col-6">
                    <label htmlFor="inputSobrenome" className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" id="inputSobrenome" value={sobrenome} onChange={sobrenomeHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCPF" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="inputCPF" value={cpf} onChange={cpfHandler} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputSIAPE" className="form-label">SIAPE</label>
                    <input type="text" className="form-control" id="inputSIAPE" />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" value={email} onChange={emailHandler} />
                </div>

                <div className="col-7">
                    <label htmlFor="inputData" className="form-label">Data de Nascimento</label>
                    <input type="text" className="form-control" id="inputData" placeholder="dd/mm/yyyy" />
                </div>
                <div className="row mt-3">
                    <div className="col-8 ">
                        <button type="submit" className="btn btn-success" id="submit" title="Salvar">{btnOperation ? "Alterar" : "Cadastrar"} </button>
                    </div>
                    <div className="col-2">
                        <button type="button" className={btnOperation ? "btn btn-danger" : "invisible"} title="Excluir"><FiTrash2 /></button>
                    </div>
                    <div className="col-2">
                        <button type="button" className={btnOperation ? "btn btn-primary" : "invisible"} title="Limpar" onClick={handleClear}><AiOutlineClear/></button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default Form;
