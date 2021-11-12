import { DeleteRequest, PostRequest, PutRequest } from "hooks/useAxios";
import { createContext, useState, FC, ChangeEvent } from "react";
import { Disciplina } from "types/disciplina";
import { options } from "types/options";

interface IDisciplinaContext {
    nome: string,
    id: number,
    myStorage: Storage,
    btnOperation: boolean,
    professores: options[],
    formIsOk: boolean,
    codMoodle: number | undefined,


    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    selectedProfHandler?: (electedOption: any) => void,
    handleClick?: (item: Disciplina) => void,
    handleClear?: () => void,
    handleDeleteDisciplina?: () => void,
    handleSubmit?: () => void,

}

const defaultState = {
    nome: "",
    id: 0,
    myStorage: sessionStorage,
    btnOperation: false,
    index: 0,
    professores: [],
    formIsOk: true,
    codMoodle: undefined
}

export const DisciplinaContext = createContext<IDisciplinaContext>(defaultState);

const DisciplinaContextProvider: FC = ({ children }) => {
    var myStorage = window.sessionStorage;


    const [id, setId] = useState(0),
        [nome, setNome] = useState(""),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true),
        [professores, setProfessores] = useState<options[]>([]),
        [codMoodle, setCodMoodle] = useState<number | undefined>(undefined);

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

    function handleClick(item: Disciplina) {
        setNome(item?.nome === undefined ? "" : item.nome);
        setId(item?.id === undefined ? 0 : item.id);
        setProfessores(item?.professores === undefined ? [] : item.professores.map((prof) => {
            return {
                value: prof.id,
                label: prof.nome + ' ' + prof.sobrenome
            }
        }));
        setCodMoodle(item.codMoodle);
        setBtnOperation(true);
    }

    function handleClear() {
        setNome("");
        setId(0);
        setProfessores([]);
        setBtnOperation(false);
        setCodMoodle(undefined);
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
                    professores: professores.map((x => {
                        return {
                            id: x.value
                        }
                    }))
                }

                PutRequest(`/disciplina`, disciplina, disciplina.id).then(go => {
                    window.location.reload();
                })

            } else {
                const disciplina = {
                    nome: nome,
                    professores: professores.map((x => {
                        return {
                            id: x.value
                        }
                    }))
                }
                PostRequest(`/disciplina`, disciplina).then(go => {
                    window.location.reload();
                });
            }
        }
    }

    function handleDeleteDisciplina() {
        DeleteRequest(`/disciplina`, id).then(go => {
            window.location.reload();
        });
    }



    return (
        <DisciplinaContext.Provider value={{
            id, nome, myStorage, professores, formIsOk, codMoodle,
            nomeHandler, handleClick,
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