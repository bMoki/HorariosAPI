import axios from "axios";
import { BASE_URL } from "utils/requests";
import { Prof } from "types/prof";
import { useEffect, useState } from "react";




function Form() {

    const [nome,setNome] = useState("");
    const [cpf,setCPF] = useState("");
    const [sobrenome,setSobrenome] = useState("");
    const [email,setEmail] = useState("");

    function nomeHandler(event:any){
       setNome(event.target.value);
    }

    function cpfHandler(event:any){
        setCPF(event.target.value);
     }

     function sobrenomeHandler(event:any){
        setSobrenome(event.target.value);
     }
     function emailHandler(event:any){
        setEmail(event.target.value);
     }

     function handleSubmit(){
        const profe = {
            nome: nome,
            sobrenome: sobrenome,
            cpf: cpf,
            email: email   
        } 
        axios.post(`${BASE_URL}/professor`,profe)
            .then((response) => console.log(response))
            .catch((err) => {
                alert("ops! ocorreu um erro " + err);
             });   
     }

        
    
        return (
            <>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-6">
                        <label htmlFor="inputName" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="inputName" onChange={nomeHandler}/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputSobrenome" className="form-label">Sobrenome</label>
                        <input type="text" className="form-control" id="inputSobrenome" onChange={sobrenomeHandler}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCPF" className="form-label">CPF</label>
                        <input type="text" className="form-control" id="inputCPF" onChange={cpfHandler}/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputSIAPE" className="form-label">SIAPE</label>
                        <input type="text" className="form-control" id="inputSIAPE" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" onChange={emailHandler}/>
                    </div>

                    <div className="col-7">
                        <label htmlFor="inputData" className="form-label">Data de Nascimento</label>
                        <input type="text" className="form-control" id="inputData" placeholder="dd/mm/yyyy" />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" id="submit">Sign in</button>
                    </div>
                </form>
            </>
        );
    };
export default Form;
