function Form() {
    return (
        <>
            <form className="row g-3">
            <div className="col-4">
                    <label htmlFor="inputAddress" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                </div>
                <div className="col-4">
                    <label htmlFor="inputAddress2" className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </div>
                <div className="col-4">
                    <label htmlFor="inputAddress2" className="form-label">Data de Nascimento</label>
                    <input type="text" className="form-control" id="inputAddress2" placeholder="dd/mm/yyyy" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail4" />
                </div>
               
                <div className="col-md-3">
                    <label htmlFor="inputCity" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Check me out
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </div>
            </form>
        </>
    );
}

export default Form;
