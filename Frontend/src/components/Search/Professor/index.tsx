import { useContext } from "react";

import { ProfessorContext } from "contexts/ProfessorContext";

import { AiOutlineSearch } from "react-icons/ai";





function SearchProf() {

    const { searchNome,
        searchCpf,
        searchSiape,
        searchSobrenome,
        searchNomeHandler,
        searchCpfHandler,
        searchSiapeHandler,
        searchSobrenomeHandler,
        handleSearch
    } = useContext(ProfessorContext);



    return (
        <>
            <form className="row g-3" >
                <div className="col">
                    <label htmlFor="inputName" className="form-label">Nome</label>
                    <input type="text" className="form-control" id="inputName" value={searchNome} onChange={searchNomeHandler} />
                </div>
                <div className="col">
                    <label htmlFor="inputSobrenome" className="form-label">Sobrenome</label>
                    <input type="text" className="form-control" id="inputSobrenome" value={searchSobrenome} onChange={searchSobrenomeHandler} />
                </div>
                <div className="col">
                    <label htmlFor="inputCPF" className="form-label">CPF</label>
                    <input type="text" className="form-control" id="inputCPF" value={searchCpf} onChange={searchCpfHandler} />
                </div>
                <div className="col">
                    <label htmlFor="inputSIAPE" className="form-label">SIAPE</label>
                    <input type="text" className="form-control" id="inputSIAPE" value={searchSiape} onChange={searchSiapeHandler} />
                </div>
                <div className="col-1 d-flex align-items-end">
                    <button type="button" className="btn btn-primary" title="Search" id="btnSearch" onClick={handleSearch}><AiOutlineSearch /></button>
                </div>

            </form>

        </>
    );
};
export default SearchProf;
