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

function ColsHorario({ turma, dia, periodo, horarios }: Props) {
    const { handleClick } = useContext(HorarioContext);

    return (
        <>
            <td className="align-middle p-0">
                <table className="table table-bordered m-0 table-horario">
                    <tbody onClick={() => handleClick!(dia, periodo, turma, horarios[0])}>
                        <tr>
                            <td className="table-secondary align-middle" height="75px">{horarios.length ? horarios[0].disciplina?.nome : "⠀"}</td>
                        </tr>

                        <tr>
                            <td className="table-light align-middle">{horarios.length ? horarios[0].professor?.nome : "⠀"}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </>
    )
}

export default ColsHorario;