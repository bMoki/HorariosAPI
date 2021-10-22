import { Horario } from "types/horario";

type Props = {
    horarios: Horario[] | []
}

function ColsHorario(props: Props) {

    return (
        <>
            <td className="align-middle p-0">
                <table className="table table-bordered m-0">
                    <tbody>
                        <tr>
                            <td className="table-secondary align-middle" height="75px">{props.horarios.length ? props.horarios[0].disciplina?.nome: "⠀"}</td>
                        </tr>

                        <tr>
                            <td>{props.horarios.length ? props.horarios[0].professor?.nome: "⠀"}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </>
    )
}

export default ColsHorario;