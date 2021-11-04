import { DeleteRequest, PostRequest, PutRequest } from "hooks/useAxios";
import { createContext, useState, FC, ChangeEvent } from "react";
import { Curso } from "types/curso";
import { options } from "types/options";
import { BASE_URL } from "utils/requests";





interface ICursoContext {
    nome: string,
    id: number,
    quantidade: string,
    btnOperation: boolean,
    disciplinas: options[],
    formIsOk: boolean,


    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    quantidadeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    selectedDisciplinaHandler?: (electedOption: any) => void,
    handleClick?: (item: Curso) => void,
    handleClear?: () => void,
    handleDeleteCurso?: () => void,
    handleSubmit?: () => void,

}

const defaultState = {
    nome: "",
    id: 0,
    quantidade: "1",
    btnOperation: false,
    index: 0,
    disciplinas: [],
    formIsOk: true
}

export const CursoContext = createContext<ICursoContext>(defaultState);

const CursoContextProvider: FC = ({ children }) => {

    const [id, setId] = useState(0),
        [nome, setNome] = useState(""),
        [quantidade, setQuantidade] = useState("1"),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true),
        [disciplinas, setDisciplinas] = useState<options[]>([]);



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
    function quantidadeHandler(event: ChangeEvent<HTMLInputElement>) {
        setQuantidade(Number(event.target.value) < 1 ? "1" : event.target.value);
    }

    function handleClick(item: Curso) {
        setNome(item?.nome === undefined ? "" : item.nome);
        setId(item?.id === undefined ? 0 : item.id);
        setDisciplinas(item?.disciplinas === undefined ? [] : item.disciplinas.map((disciplina) => {
            return {
                value: disciplina.id,
                label: disciplina.nome
            }
        }));
        setQuantidade(item?.quantidadeTurma === undefined ? "1" : String(item.quantidadeTurma));
        setBtnOperation(true);
    }

    function handleClear() {
        setNome("");
        setId(0);
        setQuantidade("1");
        setDisciplinas([]);
        setBtnOperation(false);
        setFormIsOk(true);
    }

    function FormValidation() {
        var Ok = true;

        if (nome === "") {
            Ok = false;
        }
        if (quantidade === "") {
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
                    id: id,
                    nome: nome,
                    quantidadeTurma: quantidade,
                    disciplinas: disciplinas.map((x => {
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
                    quantidadeTurma: quantidade,
                    disciplinas: disciplinas.map((x => {
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

    function handleDeleteCurso() {
        DeleteRequest(`${BASE_URL}/curso`, id).then(go => {
            window.location.reload();
        });
    }



    return (
        <CursoContext.Provider value={{
            id, nome, quantidade, disciplinas, formIsOk,
            nomeHandler, quantidadeHandler, handleClick,
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