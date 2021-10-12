import {  useEffect, useState } from "react";
import Select from "react-select";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { ProfPage } from "types/prof";
import { BASE_URL } from "utils/requests";





function ComboBoxProf() {

    const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/professor`);
    const [professor, setProfessor] = useState<ProfPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });
    const [options, setOptions] = useState([{}])

    useEffect(() => {
        setProfessor(data);
    }, [data])

    useEffect(() => {
        fetchError && setOptions([{label: fetchError }]);
        professor.content?.length ?
        setOptions(professor.content!.map((item)=>{
            return {
                value: item.id,
                label: item.nome + ' ' + item.sobrenome
            }   
        })) : setOptions([]);
    }, [professor,fetchError])


    // let obj;

    // professor.content?.length ?

    //     obj = professor.content?.map((item) => {
    //         return {
    //             value: item.id,
    //             label: item.nome + ' ' + item.sobrenome
    //         }
    //     }) : obj = [{ value: 0, label: "Sem professores" }];


    // if (fetchError) {
    //     obj = [{ value: 0, label: fetchError }]
    // }


    // obj = professor.content?.map((item) => {
    //     return {
    //         value: item.id,
    //         label: item.nome + ' ' + item.sobrenome
    //     }
    // })

    // obj = [
    //     {value:1,label:"op1"},
    //     {value:2,label:"op2"},
    //     {value:3,label:"op3"},
    //     {value:4,label:"op4"},
    //     {value:5,label:"op5"},
    //     {value:6,label:"op6"}
    // ]



    return (
        <>

            <label htmlFor="comboBox" className="form-label" >Professores</label>
            <div className="form-group">
                <Select
                    
                    options={options}
                    isMulti
                    isSearchable
                    isLoading={isLoading}
                    noOptionsMessage={() => 'Não há professor'}
                />
            </div>



        </>
    );
};
export default ComboBoxProf;
