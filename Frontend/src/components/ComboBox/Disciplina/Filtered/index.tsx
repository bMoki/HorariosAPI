import { useContext, useEffect, useState } from "react";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { HorarioContext } from "contexts/HorarioContext";
import { Curso } from "types/curso";
import { CustomSelect } from "../../customSelect";

function ComboBoxDisciplinaFiltered() {

    const {cursoOptions,disciplinaOptions,selectedDisciplinaHandler, formIsOk} = useContext(HorarioContext);

    const { data, fetchError, isLoading } = useAxiosFetchById(`/curso/${cursoOptions.value === undefined ? "": cursoOptions.value}`);
    const [result, setResult] = useState<Curso>();
    const [options, setOptions] = useState([{}]);

    useEffect(() => {
        setResult(data);
    }, [data])

    useEffect(() => {
        fetchError && setOptions([{ label: fetchError }]);
        result?.disciplinas ?
            setOptions(result.disciplinas.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })) : setOptions([]);
    }, [result, fetchError])


    return (
        <>

            <label htmlFor="comboBox" className="form-label" >Disciplinas</label>
            <div className="form-group">
                <CustomSelect
                    options={options}
                    value={disciplinaOptions === null ? null : disciplinaOptions.value ? disciplinaOptions : null}
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há disciplina'}
                    onChange={selectedDisciplinaHandler}
                    isValid={!formIsOk ?  disciplinaOptions.value ? true : false : true}
                />
            </div>



        </>
    );
};
export default ComboBoxDisciplinaFiltered;
