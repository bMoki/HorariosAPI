import { DeleteRequest, PostRequest, PutRequest } from "hooks/useAxios";
import { createContext, useState, FC, ChangeEvent } from "react";
import { Disciplina } from "types/disciplina";
import { options } from "types/options";
import { Prof } from "types/prof";
import { BASE_URL } from "utils/requests";





interface IDisciplinaContext {
    nome: string,
    id: number,
    myStorage: Storage,
    btnOperation: boolean,
    professores: options[],
    formIsOk:boolean,


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
    index:0,
    professores:[],
    formIsOk: true
}

export const DisciplinaContext = createContext<IDisciplinaContext>(defaultState);

const DisciplinaContextProvider: FC = ({ children }) => {
    var myStorage = window.sessionStorage;


    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [btnOperation, setBtnOperation] = useState(false);
    const [formIsOk, setFormIsOk] = useState(true);
    const [professores,setProfessores] = useState<options[]>([]);

    const [selectedProf, setSelectedProf] = useState<Prof[]>([]);

    function selectedProfHandler(selectedOption?: options[]) {
        setSelectedProf(selectedOption === undefined ? [] :
            selectedOption.map((item) => {
                return {
                    id: item.value
                }
            }));
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
        setProfessores(item?.professores === undefined ? [] : item.professores.map((prof)=>{
            return {
                value: prof.id,
                label: prof.nome + ' ' + prof.sobrenome
            }
        }));
        setBtnOperation(true);
    }

    function handleClear() {
        setNome("");
        setId(0);
        setProfessores([]);
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
            console.log(btnOperation);
            if (btnOperation) {
                const disciplina = {
                    id:id,
                    nome: nome,
                    professores: selectedProf
                }

                PutRequest(`${BASE_URL}/disciplina`, disciplina, disciplina.id).then(go => {
                    window.location.reload();
                })

            } else {
                const disciplina = {
                    nome: nome,
                    professores: selectedProf
                }
                PostRequest(`${BASE_URL}/disciplina`, disciplina).then(go => {
                    window.location.reload();
                });
            }
        }
    }

    function handleDeleteDisciplina() {
        DeleteRequest(`${BASE_URL}/disciplina`, id).then(go => {
            window.location.reload();
        });
    }



    return (
        <DisciplinaContext.Provider value={{
            id, nome, myStorage,professores,formIsOk,
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