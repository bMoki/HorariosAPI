import { DeleteRequest, PostRequest, PutRequest } from "hooks/useAxios";
import { createContext, useState, FC, ChangeEvent } from "react";
import { options } from "types/options";
import { BASE_URL } from "utils/requests";





interface IHorarioContext {
    nome: string,
    id: number,
    btnOperation: boolean,
    cursoOptions: options,
    turma: options,
    formIsOk: boolean,


    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    selectedCursoHandler?: (electedOption: any) => void,
    selectedTurmaHandler?: (electedOption: any) => void,
    //handleClick?: (item: Curso) => void,
    handleClear?: () => void,
    handleDeleteCurso?: () => void,
    handleSubmit?: () => void,

}

const defaultState = {
    nome: "",
    id: 0,
    btnOperation: false,
    index: 0,
    cursoOptions: {},
    turma: {},
    formIsOk: true
}

export const HorarioContext = createContext<IHorarioContext>(defaultState);

const HorarioContextProvider: FC = ({ children }) => {


    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [btnOperation, setBtnOperation] = useState(false);
    const [formIsOk, setFormIsOk] = useState(true);
    const [cursoOptions, setCursoOptions] = useState<options>({});
    const [turma, setTurma] = useState<options>({});


    function selectedCursoHandler(selectedOption?: options) {
        setCursoOptions(selectedOption === undefined ? {} : selectedOption);
    }

    function selectedTurmaHandler(selectedOption?: options) {
        setTurma(selectedOption === undefined ? {} : selectedOption);
    }


    function nomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }

    /*
    function handleClick(item: Curso) {
        setNome(item?.nome === undefined ? "" : item.nome);
        setId(item?.id === undefined ? 0 : item.id);
        setCursos(item?.disciplinas === undefined ? [] : item.disciplinas.map((disciplina)=>{
            return {
                value: disciplina.id,
                label: disciplina.nome
            }
        }));
        setBtnOperation(true);
    }
*/
    function handleClear() {
        setNome("");
        setId(0);
        setCursoOptions({});
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

    /*
    function handleSubmit() {
        const Ok = FormValidation();

        if (Ok) {
            if (btnOperation) {
                const curso = {
                    id: id,
                    nome: nome,
                    disciplinas: curso.map((x => {
                        return {
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
                    disciplinas: curso.map((x => {
                        return {
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
    */

    function handleDeleteCurso() {
        DeleteRequest(`${BASE_URL}/curso`, id).then(go => {
            window.location.reload();
        });
    }



    return (
        <HorarioContext.Provider value={{
            id, nome,cursoOptions,turma, formIsOk,
            nomeHandler,
            btnOperation,
            handleClear,
            handleDeleteCurso,
            selectedCursoHandler,
            selectedTurmaHandler
        }}>
            {children}
        </HorarioContext.Provider>
    )
}

export default HorarioContextProvider;