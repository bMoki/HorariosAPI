import LoadingSpinner from "components/Loading";
import { HorarioContext } from "contexts/HorarioContext";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { useContext, useEffect, useState } from "react";
import { Curso } from "types/curso";
import { Turma } from "types/turma";
import RowsHorario from "./Rows";


function TableHorario() {

    const { cursoOptions, turmaOptions
    } = useContext(HorarioContext);

    const { data, fetchError, isLoading } = useAxiosFetchById(`/curso/${cursoOptions.value === undefined ? "" : cursoOptions.value}`);
    const [result, setResult] = useState<Curso>();
    const [selectedTurma, setTurma] = useState<Turma[]>();


    useEffect(() => {
        setResult(data);
    }, [data])

    useEffect(() => {
        setTurma(result?.turmas);
        if (turmaOptions !== null) {
            if (turmaOptions.value !== undefined) {
                setTurma(result && result?.turmas?.filter(t => t.id === (turmaOptions === null ? {} : turmaOptions.value)));
            }
        }
    }, [turmaOptions, result])

    return (
        <>
            {isLoading &&
                <div className="d-flex justify-content-center">
                   <LoadingSpinner margin="mt-5 mb-5"/>
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


                            <RowsHorario horarios={turmas.horarios.filter(horarios => horarios.periodo === 1)} turma={turmas} periodo={1} />
                            <RowsHorario horarios={turmas.horarios.filter(horarios => horarios.periodo === 2)} turma={turmas} periodo={2} />



                        </tbody>

                    </table>
                </div>



            )))
                : <div className="d-flex justify-content-center mt-5"><h3>Selecione um curso</h3></div>)}



        </>
    );
}

export default TableHorario;
