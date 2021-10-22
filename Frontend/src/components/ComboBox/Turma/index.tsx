import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { BASE_URL } from "utils/requests";
import { HorarioContext } from "contexts/HorarioContext";
import { Curso } from "types/curso";


function ComboBoxTurma() {

    const { selectedTurmaHandler, cursoOptions, turma,
    } = useContext(HorarioContext);

    const { data, fetchError, isLoading } = useAxiosFetchById(`${BASE_URL}/curso/${cursoOptions.value === undefined ? "": cursoOptions.value}`);
    const [result, setResult] = useState<Curso>();
    const [options, setOptions] = useState([{}]);


    useEffect(() => {
        setResult(data);
    }, [data])

    useEffect(() => {
        fetchError && setOptions([{ label: fetchError }]);
        result?.turmas ?
            setOptions(result.turmas.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })) : setOptions([]);
    }, [result, fetchError])


    return (
        <>

            <label htmlFor="comboBox" className="form-label" >Semestres</label>
            <div className="form-group">
                <Select
                    isClearable
                    options={options}
                    value={turma === null ? null : turma.value ? turma : null}
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há turmas'}
                    onChange={selectedTurmaHandler}
                />
            </div>



        </>
    );
};
export default ComboBoxTurma;
