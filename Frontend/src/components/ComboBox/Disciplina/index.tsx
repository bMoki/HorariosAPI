import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { BASE_URL } from "utils/requests";
import { DisciplinaPage } from "types/disciplina";
import { CursoContext } from "contexts/CursoContext";


function ComboBoxDisciplina() {

    const { selectedDisciplinaHandler, disciplinas
    } = useContext(CursoContext);

    const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/disciplina`);
    const [disciplina, setDisciplina] = useState<DisciplinaPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [options, setOptions] = useState([{}]);


    useEffect(() => {
        setDisciplina(data);
    }, [data])

    useEffect(() => {
        fetchError && setOptions([{ label: fetchError }]);
        disciplina.content?.length ?
            setOptions(disciplina.content!.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })) : setOptions([]);
    }, [disciplina, fetchError])


    return (
        <>

            <label htmlFor="comboBox" className="form-label" >Disciplinas</label>
            <div className="form-group">
                <Select
                    options={options}
                    value={disciplinas}
                    isMulti
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há disciplina'}
                    onChange={selectedDisciplinaHandler}
                    closeMenuOnSelect={false}
                />
            </div>



        </>
    );
};
export default ComboBoxDisciplina;