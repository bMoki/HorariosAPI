import { DeleteRequest, PostRequest, PutRequest } from "hooks/useAxios";
import { createContext, useState, FC, ChangeEvent } from "react";
import { Curso } from "types/curso";
import { options } from "types/options";
import { BASE_URL } from "utils/requests";





interface ICursoContext {
    nome: string,
    id: number,
    myStorage: Storage,
    btnOperation: boolean,
    disciplinas: options[],
    formIsOk:boolean,


    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    selectedDisciplinaHandler?: (electedOption: any) => void,
    handleClick?: (item: Curso) => void,
    handleClear?: () => void,
    handleDeleteCurso?: () => void,
    handleSubmit?: () => void,

}

const defaultState = {
    nome: "",
    id: 0,
    myStorage: sessionStorage,
    btnOperation: false,
    index:0,
    disciplinas:[],
    formIsOk: true
}

export const CursoContext = createContext<ICursoContext>(defaultState);

const CursoContextProvider: FC = ({ children }) => {
    var myStorage = window.sessionStorage;


    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [btnOperation, setBtnOperation] = useState(false);
    const [formIsOk, setFormIsOk] = useState(true);
    const [disciplinas,setDisciplinas] = useState<options[]>([]);

  

    function selectedDisciplinaHandler(selectedOption?: options[]) {
       
            setDisciplinas(selectedOption === undefined ? [] : 
            selectedOption.map((item) => {
                return {
                    value: item.value,
                    label: item.label
                }
            })); 
            
    }


    function nomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }

    function handleClick(item: Curso) {
        setNome(item?.nome === undefined ? "" : item.nome);
        setId(item?.id === undefined ? 0 : item.id);
        setDisciplinas(item?.disciplinas === undefined ? [] : item.disciplinas.map((disciplina)=>{
            return {
                value: disciplina.id,
                label: disciplina.nome
            }
        }));
        setBtnOperation(true);
    }

    function handleClear() {
        setNome("");
        setId(0);
        setDisciplinas([]);
        setBtnOperation(false);
        setFormIsOk(true);
    }

    function FormValidation() {
        var Ok = true;

        if (nome === "") {
            Ok = false;
        }

        setFormIsOk(Ok)
        return Ok;

    }

    function handleSubmit() {
        const Ok = FormValidation();

        if (Ok) {
            if (btnOperation) {
                const curso = {
                    id:id,
                    nome: nome,
                    disciplinas: disciplinas.map((x =>{
                        return{
                            id: x.value
                        }
                    }))
                }

                PutRequest(`${BASE_URL}/curso`, curso, curso.id).then(go => {
                    window.location.reload();
                })

            } else {
                const curso = {
                    nome: nome,
                    disciplinas: disciplinas.map((x =>{
                        return{
                            id: x.value
                        }
                    }))
                }
                PostRequest(`${BASE_URL}/curso`, curso).then(go => {
                    window.location.reload();
                });
            }
        }
    }

    function handleDeleteCurso() {
        DeleteRequest(`${BASE_URL}/curso`, id).then(go => {
            window.location.reload();
        });
    }



    return (
        <CursoContext.Provider value={{
            id, nome, myStorage,disciplinas,formIsOk,
            nomeHandler, handleClick,
            btnOperation,
            handleClear,
            handleDeleteCurso,
            selectedDisciplinaHandler, handleSubmit
        }}>
            {children}
        </CursoContext.Provider>
    )
}

export default CursoContextProvider;