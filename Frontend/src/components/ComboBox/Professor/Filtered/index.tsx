import { useContext, useEffect, useState } from "react";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { HorarioContext } from "contexts/HorarioContext";
import { Disciplina } from "types/disciplina";
import { CustomSelect } from "components/ComboBox/customSelect";


function ComboBoxProfFiltered() {

    const { disciplinaOptions , professorOptions, selectedProfessorHandler,formIsOk
    } = useContext(HorarioContext);

    const { data, fetchError, isLoading } = useAxiosFetchById(`/disciplina/${disciplinaOptions.value === undefined ? "": disciplinaOptions.value}`);
    const [result, setResult] = useState<Disciplina>();
    const [options, setOptions] = useState([{}]);

    useEffect(() => {
        setResult(data);
    }, [data])

    useEffect(() => {
        fetchError && setOptions([{ label: fetchError }]);
        result?.professores ?
            setOptions(result.professores.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })) : setOptions([]);
    }, [result, fetchError])


    return (
        <>

            <label htmlFor="comboBox" className="form-label" >Professores</label>
            <div className="form-group">
                <CustomSelect
                    options={options}
                    value={professorOptions === null ? null : professorOptions.value ? professorOptions : null}
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há professor'}
                    onChange={selectedProfessorHandler}
                    isValid={!formIsOk ?  professorOptions.value ? true : false : true}
                />
            </div>



        </>
    );
};
export default ComboBoxProfFiltered;
