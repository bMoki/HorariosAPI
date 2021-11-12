import { DeleteRequest, PostRequest, PutRequest } from "hooks/useAxios";
import { ChangeEvent, createContext, FC, useState } from "react";
import { mask } from "remask";
import { Aluno } from "types/aluno";
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
}

export const AlunoContext = createContext<IAlunoContext>(defaultState);

const AlunoContextProvider: FC = ({ children }) => {
    const [id, setId] = useState(0),
        [nomeCompleto, setNomeCompleto] = useState(""),
        [cpf, setCpf] = useState(""),
        [matricula, setMatricula] = useState(""),
        [ativo, setAtivo] = useState(true),
        [dataInativacao, setDataInativacao] = useState(""),
        [dataInclusao, setDataInclusao] = useState(""),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true);

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
                    dataInclusao: dtInclusao
                }

                PutRequest(`/aluno`, aluno, aluno.id).then(go => {
                    window.location.reload();
                })

            } else {
                const aluno = {
                    nomeCompleto: nomeCompleto,
                    matricula: matricula,
                    cpf: cpf,
                    ativo: ativo,
                    dataInativacao: dtInativacao,
                    dataInclusao: dtInclusao
                }

                PostRequest(`/aluno`, aluno).then(go => {
                    window.location.reload();
                });


            }
        }
    }

    function handleDeleteAluno() {
        DeleteRequest(`/aluno`, id).then(go => {
            window.location.reload();
        });
    }





    return (
        <AlunoContext.Provider value={{
            nomeCompleto, cpf, matricula, dataInativacao, dataInclusao, ativo, id,
            nomeCompletoHandler, cpfHandler, matriculaHandler, ativoHandler, dataInativacaoHandler, dataInclusaoHandler,
            btnOperation, formIsOk, handleClear, handleSubmit,
            handleClick, handleDeleteAluno
        }}>
            {children}
        </AlunoContext.Provider>
    )
}

export default AlunoContextProvider;