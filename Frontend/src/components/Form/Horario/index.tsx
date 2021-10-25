import ComboBoxDisciplina from "components/ComboBox/Disciplina";
import ComboBoxProf from "components/ComboBox/Professor";

function FormHorario() {

    return (
        <>
            <form className="row g-3" >

                <div className="col-lg-3 col-sm-6">
                    <label htmlFor="inputDia" className="form-label">Dia</label>
                    <input type="text" className="form-control" disabled id="inputDia" />
                </div>
                <div className="col-lg-2 col-sm-6">
                    <label htmlFor="inputPeriodo" className="form-label">Periodo</label>
                    <input type="text" className="form-control" disabled id="inputPeriodo" />
                </div>
                <div className="col">
                    <ComboBoxDisciplina />
                </div>
                <div className="col">
                    <ComboBoxProf />
                </div>

            </form>

        </>
    );
};
export default FormHorario;
