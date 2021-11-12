import { LoginContext } from "contexts/LoginContext";
import { ChangeEvent, useContext, useState } from "react";
import { useHistory } from "react-router";

function FormLogin() {
    const { handleLogin } = useContext(LoginContext);
    const history = useHistory();

    const [username, setUsername] = useState(""),
        [senha, setSenha] = useState("");

    function handleUsername(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handleSenha(event: ChangeEvent<HTMLInputElement>) {
        setSenha(event.target.value);
    }

    function Login() {
        handleLogin!(username, senha, history);
    }


    return (
        <>

            <form className="row g-3" >
                <h2 className='d-flex justify-content-center'>Login</h2>
                <div className="col-12">
                    <label htmlFor="inputUsuario" className="form-label">Usuário</label>
                    <input type="text" className="form-control" id="inputUsuario" onChange={handleUsername} value={username} />
                </div>
                <div className="col-12">
                    <label htmlFor="inputSenha" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="inputSenha" onChange={handleSenha} value={senha} />
                </div>

                <div className="col-12 mt-5">
                    <div className="d-grid gap-2 col-12 mx-auto">
                        <button type="button" className="btn btn-success" id="submit" title="Salvar" onClick={Login}>Entrar</button>
                    </div>

                </div>
            </form>

        </>
    );
};
export default FormLogin;
