import { Horario } from "types/horario";
import { Turma } from "types/turma";
import ColsHorario from "../Cols";

const dias = ["SEGUNDA","TERÇA","QUARTA","QUINTA","SEXTA"];

type Props = {
    horarios: Horario[] | [],
    turma: Turma,
    periodo: number
}

function RowsHorario(props: Props) {

    return (
        <>
            <tr >
                <td className="align-middle border-start">{props.horarios.length ? props.horarios[0].periodo===1 ? "8 as 10:30" : "10:30 as 12" : "⠀"}</td>
                {dias.map(dia=>(
                    <ColsHorario horarios={props.horarios.length ? props.horarios.filter(horario=>horario.diaSemana===dia):[]} key={dia} turma={props.turma} periodo={props.periodo} dia={dia}/>   
                ))}
               
            </tr>
        </>
    )
}

export default RowsHorario;