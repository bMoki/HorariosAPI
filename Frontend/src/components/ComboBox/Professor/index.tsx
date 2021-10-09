import { useContext } from "react";
import { ProfessorContext } from "contexts/ProfessorContext";
import Select from "react-select";





function ComboBoxProf() {

    const { page, isLoading, fetchError
    } = useContext(ProfessorContext);

    
    let obj;
    if(isLoading){
        obj = [{value:0,label:"Loading..."}]
    }else{
        page.content?.length ? 
       
        obj = page.content?.map((item) => {
            return {
                value: item.id,
                label: item.nome + ' ' + item.sobrenome
            }
        }) : obj = [{value:0,label:"Sem professores"}] ;
    }

    if(fetchError){
        obj = [{value:0,label:fetchError}]
    }

   
    // obj = page.content?.map((item) => {
    //             return {
    //                 value: item.id,
    //                 label: item.nome + ' ' + item.sobrenome
    //             }
    //         })
    // let obj = [
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
                    options={obj}
                    isMulti
                    isSearchable
                />
            </div>



        </>
    );
};
export default ComboBoxProf;
