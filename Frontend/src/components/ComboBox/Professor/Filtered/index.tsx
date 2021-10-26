import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useAxiosFetchById } from "hooks/useAxiosFetch";
import { BASE_URL } from "utils/requests";
import { HorarioContext } from "contexts/HorarioContext";
import { Disciplina } from "types/disciplina";


function ComboBoxProfFiltered() {

    const { disciplinaOptions , professorOptions, selectedProfessorHandler
    } = useContext(HorarioContext);

    const { data, fetchError, isLoading } = useAxiosFetchById(`${BASE_URL}/disciplina/${disciplinaOptions.value === undefined ? "": disciplinaOptions.value}`);
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
                <Select
                    options={options}
                    value={professorOptions === null ? null : professorOptions.value ? professorOptions : null}
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há professor'}
                    onChange={selectedProfessorHandler}
                />
            </div>



        </>
    );
};
export default ComboBoxProfFiltered;
