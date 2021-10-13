import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { ProfPage } from "types/prof";
import { BASE_URL } from "utils/requests";
import { DisciplinaContext } from "contexts/DisciplinaContext";


function ComboBoxProf(props: any) {

    const { selectedProfHandler, professores
    } = useContext(DisciplinaContext);

    const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/professor`);
    const [professor, setProfessor] = useState<ProfPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [options, setOptions] = useState([{}]);


    useEffect(() => {
        setProfessor(data);
    }, [data])

    useEffect(() => {
        fetchError && setOptions([{ label: fetchError }]);
        professor.content?.length ?
            setOptions(professor.content!.map((item) => {
                return {
                    value: item.id,
                    label: item.nome + ' ' + item.sobrenome
                }
            })) : setOptions([]);
    }, [professor, fetchError])


    return (
        <>

            <label htmlFor="comboBox" className="form-label" >Professores</label>
            <div className="form-group">
                <Select
                    options={options}
                    value={professores}
                    isMulti
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há professor'}
                    onChange={selectedProfHandler}




                />
            </div>



        </>
    );
};
export default ComboBoxProf;
