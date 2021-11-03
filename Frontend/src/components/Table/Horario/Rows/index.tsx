import { Horario } from "types/horario";
import { Turma } from "types/turma";
import ColsHorario from "../Cols";

const dias = ["SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA"];

type Props = {
    horarios: Horario[] | [],
    turma: Turma,
    periodo: number
}

function RowsHorario({ horarios, turma, periodo }: Props) {

    return (
        <>
            <tr >
                <td className="align-middle border-start">{horarios.length ? horarios[0].periodo === 1 ? "8 as 10:30" : "10:30 as 12" : "⠀"}</td>
                {dias.map(dia => (
                    <ColsHorario horarios={horarios.length ? horarios.filter(horario => horario.diaSemana === dia) : []} key={dia} turma={turma} periodo={periodo} dia={dia} />
                ))}

            </tr>
        </>
    )
}

export default RowsHorario;