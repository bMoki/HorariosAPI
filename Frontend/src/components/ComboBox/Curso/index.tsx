import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { CursoPage } from "types/curso";
import { HorarioContext } from "contexts/HorarioContext";


function ComboBoxCurso() {

    const { selectedCursoHandler, cursoOptions
    } = useContext(HorarioContext);

    const { data, fetchError, isLoading } = useAxiosFetchPage(`/curso?paged=false`);
    const [cursoPage, setCurso] = useState<CursoPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [options, setOptions] = useState([{}]);


    useEffect(() => {
        setCurso(data);
    }, [data])

    useEffect(() => {
        fetchError && setOptions([{ label: fetchError }]);
        cursoPage.content?.length ?
            setOptions(cursoPage.content!.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })) : setOptions([]);
    }, [cursoPage, fetchError])


    return (
        <>

            <label htmlFor="comboBox" className="form-label" >Cursos</label>
            <div className="form-group">
                <Select
                    options={options}
                    value={cursoOptions.value ? cursoOptions : null}
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há cursos'}
                    onChange={selectedCursoHandler}
                />
            </div>



        </>
    );
};
export default ComboBoxCurso;
