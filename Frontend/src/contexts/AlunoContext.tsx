import useApi from "hooks/useApi";
import { ChangeEvent, createContext, FC, useState } from "react";
import { mask } from "remask";
import { Aluno } from "types/aluno";
import { options } from "types/options";
import { dataFormater } from "utils/dataFormater";

interface IAlunoContext {
    id: number,
    nomeCompleto: string,
    cpf: string,
    matricula: string,
    ativo: boolean,
    dataInativacao: string,
    dataInclusao: string,
    btnOperation: boolean,
    formIsOk: boolean,

    nomeCompletoHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    cpfHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    matriculaHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    dataInativacaoHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    ativoHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    dataInclusaoHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    handleSubmit?: () => void,
    handleClear?: () => void,
    handleDeleteAluno?: () => void,
    handleClick?: (item: Aluno) => void,
    selectedDisciplinaHandler?:(selelectedOption:any) => void,
    disciplinas: options[],

}

const defaultState = {
    id: 0,
    nomeCompleto: "",
    cpf: "",
    matricula: "",
    ativo: true,
    dataInativacao: "",
    dataInclusao: "",
    btnOperation: false,
    formIsOk: true,
    disciplinas:[]
}

export const AlunoContext = createContext<IAlunoContext>(defaultState);

const AlunoContextProvider: FC = ({ children }) => {
    const api = useApi();
    const [id, setId] = useState(0),
        [nomeCompleto, setNomeCompleto] = useState(""),
        [cpf, setCpf] = useState(""),
        [matricula, setMatricula] = useState(""),
        [ativo, setAtivo] = useState(true),
        [dataInativacao, setDataInativacao] = useState(""),
        [dataInclusao, setDataInclusao] = useState(""),
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

    function nomeCompletoHandler(event: ChangeEvent<HTMLInputElement>) {
        setNomeCompleto(event.target.value);
    }

    function cpfHandler(event: ChangeEvent<HTMLInputElement>) {
        setCpf(mask(event.target.value, ['999.999.999-99']));
    }

    function matriculaHandler(event: ChangeEvent<HTMLInputElement>) {
        setMatricula(event.target.value);
    }

    function ativoHandler(event: ChangeEvent<HTMLInputElement>) {
        setAtivo(event.target.checked);
    }
    function dataInativacaoHandler(event: ChangeEvent<HTMLInputElement>) {
        setDataInativacao(mask(event.target.value, ['99/99/9999']))
    }

    function dataInclusaoHandler(event: ChangeEvent<HTMLInputElement>) {
        setDataInclusao(mask(event.target.value, ['99/99/9999']))
    }

    function handleClick(item: Aluno) {
        const data = dataFormater(item.dataInclusao);
        setDataInclusao(data === undefined ? "" : data);
        setId(item?.id === undefined ? 0 : item.id);
        setNomeCompleto(item?.nomeCompleto === undefined ? "" : item.nomeCompleto);
        setCpf(item?.cpf === undefined ? "" : item.cpf);
        setMatricula(item?.matricula === undefined ? "" : item.matricula);
        setAtivo(item?.ativo === undefined ? true : item.ativo);
        setBtnOperation(true);
        setDisciplinas(item?.disciplinas === undefined ? [] : item.disciplinas.map((disciplina) => {
            return {
                value: disciplina.id,
                label: disciplina.nome
            }
        }));
    }

    function handleClear() {
        setId(0);
        setNomeCompleto("");
        setCpf("");
        setMatricula("");
        setAtivo(true);
        setBtnOperation(false);
        setDataInativacao("");
        setDataInclusao("");
        setFormIsOk(true);
    }

    function FormValidation() {

        if (nomeCompleto === "") {
            return false;
        }

        if (cpf.length < 14) {
            return false;
        }

        if (matricula === "") {
            return false;
        }

        if (dataInclusao.length < 10) {
            return false;
        }

        return true;

    }

    function handleSubmit() {

        const Ok = FormValidation();
        setFormIsOk(Ok)
        if (Ok) {

            const dtInativacao = dataFormater(dataInativacao);
            const dtInclusao = dataFormater(dataInclusao);

            if (btnOperation) {

                const aluno = {
                    id: id,
                    nomeCompleto: nomeCompleto,
                    matricula: matricula,
                    cpf: cpf,
                    ativo: ativo,
                    dataInativacao: dtInativacao,
                    dataInclusao: dtInclusao,
                    disciplinas: disciplinas.map((x => {
                        return {
                            id: x.value
                        }
                    }))
                }

                api.put(`/aluno/${aluno.id}`, aluno);

            } else {
                const aluno = {
                    nomeCompleto: nomeCompleto,
                    matricula: matricula,
                    cpf: cpf,
                    ativo: ativo,
                    dataInativacao: dtInativacao,
                    dataInclusao: dtInclusao,
                    disciplinas: disciplinas.map((x => {
                        return {
                            id: x.value
                        }
                    }))
                }

                api.post(`/aluno`, aluno);
            }
        }
    }

    function handleDeleteAluno() {
        api.delete(`/aluno/${id}`);
    }

    return (
        <AlunoContext.Provider value={{
            nomeCompleto, cpf, matricula, dataInativacao, dataInclusao, ativo, id,
            nomeCompletoHandler, cpfHandler, matriculaHandler, ativoHandler, dataInativacaoHandler, dataInclusaoHandler,
            btnOperation, formIsOk, handleClear, handleSubmit,
            handleClick, handleDeleteAluno,disciplinas,selectedDisciplinaHandler
        }}>
            {children}
        </AlunoContext.Provider>
    )
}

export default AlunoContextProvider;