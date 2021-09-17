function Form() {
    return (
        <>
            <form className="row g-3">
                <div className="col-6">
                    <label htmlFor="inputName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="inputName" />
                </div>
                <div className="col-6">
                    <label htmlFor="inputSobrenome" className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" id="inputSobrenome" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCPF" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="inputCPF" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputSIAPE" className="form-label">SIAPE</label>
                    <input type="text" className="form-control" id="inputSIAPE" />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" />
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
}

export default Form;
