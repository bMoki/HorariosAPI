import { HorarioContext } from "contexts/HorarioContext";
import { useContext } from "react";
import { Horario } from "types/horario";
import { Turma } from "types/turma";

type Props = {
    horarios: Horario[] | [],
    turma: Turma,
    dia: string,
    periodo: number
}

function ColsHorario(props: Props) {
    const {handleClick} = useContext(HorarioContext);

    return (
        <>
            <td className="align-middle p-0">
                <table className="table table-bordered m-0 table-horario">
                    <tbody onClick={()=> handleClick!(props.dia,props.periodo,props.turma,props.horarios[0])}>
                        <tr>
                            <td className="table-secondary align-middle" height="75px">{props.horarios.length ? props.horarios[0].disciplina?.nome: "⠀"}</td>
                        </tr>

                        <tr>
                            <td className="table-light align-middle">{props.horarios.length ? props.horarios[0].professor?.nome: "⠀"}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </>
    )
}

export default ColsHorario;