import ComboBoxCurso from "components/ComboBox/Curso";
import ComboBoxTurma from "components/ComboBox/Turma";

function FormHorario() {

    // const { 
    // } = useContext(HorarioContext);

    return (
        <>
            <form className="row g-3" >

                <div className="col">
                    <ComboBoxCurso />
                </div>
                <div className="col">
                    <ComboBoxTurma/>
                </div>
            </form>

        </>
    );
};
export default FormHorario;
