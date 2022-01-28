import useApi from "hooks/useApi";
import { createContext, useState, FC, ChangeEvent } from "react";
import { Disciplina } from "types/disciplina";
import { options } from "types/options";

interface IDisciplinaContext {
    nome: string,
    id: number,
    btnOperation: boolean,
    professores: options[],
    formIsOk: boolean,
    codMoodle:string,


    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    codMoodleHandler?:(event: ChangeEvent<HTMLInputElement>) => void,
    selectedProfHandler?: (electedOption: any) => void,
    handleClick?: (item: Disciplina) => void,
    handleClear?: () => void,
    handleDeleteDisciplina?: () => void,
    handleSubmit?: () => void,

}

const defaultState = {
    nome: "",
    id: 0,
    btnOperation: false,
    index: 0,
    professores: [],
    formIsOk: true,
    codMoodle: ""
}

export const DisciplinaContext = createContext<IDisciplinaContext>(defaultState);

const DisciplinaContextProvider: FC = ({ children }) => {
    
    const api = useApi();
    const [id, setId] = useState(0),
        [nome, setNome] = useState(""),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true),
        [professores, setProfessores] = useState<options[]>([]),
        [codMoodle, setCodMoodle] = useState("");

    function selectedProfHandler(selectedOption?: options[]) {
        setProfessores(selectedOption === undefined ? [] :
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

    function codMoodleHandler(event: ChangeEvent<HTMLInputElement>) {
        setCodMoodle(event.target.value);
    }

    function handleClick(item: Disciplina) {
        setNome(item?.nome === undefined ? "" : item.nome);
        setId(item?.id === undefined ? 0 : item.id);
        setProfessores(item?.professores === undefined ? [] : item.professores === null ? [] : item.professores.map((prof) => {
            return {
                value: prof.id,
                label: prof.nome + ' ' + prof.sobrenome
            }
        }));
        setCodMoodle(item?.codMoodle === undefined ? "" : item.codMoodle === null ? "" : item.codMoodle);
        setBtnOperation(true);
    }

    function handleClear() {
        setNome("");
        setId(0);
        setProfessores([]);
        setBtnOperation(false);
        setCodMoodle("");
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
            console.log(btnOperation);
            if (btnOperation) {
                const disciplina = {
                    id: id,
                    nome: nome,
                    codMoodle:codMoodle,
                    professores: professores.map((x => {
                        return {
                            id: x.value
                        }
                    }))
                }

                api.put(`/disciplina/${disciplina.id}`, disciplina);
            } else {
                const disciplina = {
                    nome: nome,
                    codMoodle:codMoodle,
                    professores: professores.map((x => {
                        return {
                            id: x.value
                        }
                    }))
                }
                api.post(`/disciplina`, disciplina);
            }
        }
    }

    function handleDeleteDisciplina() {
        console.log(id);
        api.delete(`/disciplina/${id}`);
    }



    return (
        <DisciplinaContext.Provider value={{
            id, nome, professores, formIsOk, codMoodle,
            nomeHandler, handleClick,codMoodleHandler,
            btnOperation,
            handleClear,
            handleDeleteDisciplina,
            selectedProfHandler, handleSubmit
        }}>
            {children}
        </DisciplinaContext.Provider>
    )
}

export default DisciplinaContextProvider;