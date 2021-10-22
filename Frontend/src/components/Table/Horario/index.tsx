import { HorarioContext } from "contexts/HorarioContext";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { useContext, useEffect, useState } from "react";
import { Curso } from "types/curso";
import { Turma } from "types/turma";
import { BASE_URL } from "utils/requests";
import RowsHorario from "./Rows";


function TableHorario() {

    const { cursoOptions, turma
    } = useContext(HorarioContext);

    const { data, fetchError, isLoading } = useAxiosFetchById(`${BASE_URL}/curso/${cursoOptions.value === undefined ? "" : cursoOptions.value}`);
    const [result, setResult] = useState<Curso>();
    const [selectedTurma, setTurma] = useState<Turma[]>();


    useEffect(() => {
        setResult(data);
    }, [data])

    useEffect(() => {
        setTurma(result?.turmas);
        if (turma !== null) {
            if (turma.value !== undefined) {
                setTurma(result && result?.turmas?.filter(t => t.id === (turma === null ? {} : turma.value)));
            }
        }
    }, [turma, result])

    return (
        <>
            {isLoading &&
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
            {fetchError && <p>{fetchError}</p>}

            {!isLoading && !fetchError && (selectedTurma !== undefined ? selectedTurma?.map((turmas => (
                <div key={turmas.id} className="col-lg-12 col-md-12 col-sm-12 border shadow-sm p-3 pb-0  mt-4 m-2 d-flex flex-column">
                    <table className="table align-middle " key={turmas.id}>
                        <thead>
                            <tr>
                                <th scope="col">Turma</th>
                                <th scope="col">Horarios</th>
                                <th scope="col">Segunda</th>
                                <th scope="col">Terça</th>
                                <th scope="col">Quarta</th>
                                <th scope="col">Quinta</th>
                                <th scope="col">Sexta</th>
                            </tr>
                        </thead>
                        <tbody className="border border-dark">
                            <tr>
                                <td className="align-middle" rowSpan={4}>{turmas.nome}</td>
                            </tr>


                            <RowsHorario horarios={turmas.horarios.filter(horarios => horarios.periodo === 1)} />
                            <RowsHorario horarios={turmas.horarios.filter(horarios => horarios.periodo === 2)} />



                        </tbody>

                    </table>
                </div>



            )))
                : <div className="d-flex justify-content-center mt-5"><h3>Selecione um curso</h3></div>)}



        </>
    );
}

export default TableHorario;
