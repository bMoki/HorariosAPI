import { DeleteRequest, PostRequest, PutRequest } from "hooks/useAxios";
import { createContext, useState, FC, ChangeEvent } from "react";
import { Horario } from "types/horario";
import { options } from "types/options";
import { Turma } from "types/turma";
import { BASE_URL } from "utils/requests";





interface IHorarioContext {
    nome: string,
    id: number | undefined,
    btnOperation: boolean,
    cursoOptions: options,
    turmaOptions: options,
    disciplinaOptions: options,
    professorOptions: options,
    formIsOk: boolean,
    dia: string,
    periodo: number | undefined,
    turma: Turma | undefined,


    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    selectedCursoHandler?: (selectedOption: any) => void,
    selectedTurmaHandler?: (selectedOption: any) => void,
    selectedDisciplinaHandler?: (selectedOption: any) => void,
    selectedProfessorHandler?: (selectedOptions: any) => void,
    handleClick?: (dia: string, periodo: number, turma: Turma, horario: Horario) => void,
    handleClear?: () => void,
    handleDeleteHorario?: () => void,
    handleSubmit?: () => void,

}

const defaultState = {
    nome: "",
    id: undefined,
    btnOperation: false,
    index: 0,
    cursoOptions: {},
    turmaOptions: {},
    disciplinaOptions: {},
    professorOptions: {},
    formIsOk: true,
    dia: "",
    periodo: undefined,
    turma: undefined
}

export const HorarioContext = createContext<IHorarioContext>(defaultState);

const HorarioContextProvider: FC = ({ children }) => {


    const [id, setId] = useState<number | undefined>();
    const [nome, setNome] = useState("");
    const [btnOperation, setBtnOperation] = useState(false);
    const [formIsOk, setFormIsOk] = useState(true);
    const [cursoOptions, setCursoOptions] = useState<options>({});
    const [turmaOptions, setTurmaOptions] = useState<options>({});
    const [professorOptions, setProfessorOptions] = useState<options>({});
    const [disciplinaOptions, setDisciplinaOptions] = useState<options>({});
    const [dia, setDia] = useState("");
    const [periodo, setPeriodo] = useState<number | undefined>(undefined);
    const [turma, setTurma] = useState<Turma | undefined>(undefined);
    const [horarioId, setHorarioId] = useState<number | undefined>(undefined);



    function selectedCursoHandler(selectedOption?: options) {
        handleClear();
        setCursoOptions(selectedOption === undefined ? {} : selectedOption);
    }

    function selectedTurmaHandler(selectedOption?: options) {
        handleClear();
        setTurmaOptions(selectedOption === undefined ? {} : selectedOption);
    }

    function selectedProfessorHandler(selectedOption?: options) {
        setProfessorOptions(selectedOption === undefined ? {} : selectedOption);
    }

    function selectedDisciplinaHandler(selectedOption?: options) {
        setDisciplinaOptions(selectedOption === undefined ? {} : selectedOption);
    }


    function nomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }


    function handleClick(dia: string, periodo: number, turma: Turma, horario: Horario) {
        setDia(dia);
        setPeriodo(periodo);
        setTurma(turma);
        horario && horario.disciplina ?
            setDisciplinaOptions(() => {
                return {
                    value: horario.disciplina?.id,
                    label: horario.disciplina?.nome
                }
            }) : setDisciplinaOptions({});
        horario && horario.professor ?
            setProfessorOptions(() => {
                return {
                    value: horario.professor?.id,
                    label: horario.professor?.nome
                }
            }) : setProfessorOptions({});
        horario ? setBtnOperation(true) : setBtnOperation(false);
        horario && setId(horario.id);

    }
    function handleClear() {
        setNome("");
        setId(undefined);
        setProfessorOptions({});
        setDisciplinaOptions({});
        setDia("");
        setPeriodo(undefined);
        setTurma(undefined);
        setBtnOperation(false);
        setFormIsOk(true);
    }

    function FormValidation() {
        var Ok = true;


        setFormIsOk(Ok)
        return Ok;

    }


    function handleSubmit() {
        const Ok = FormValidation();
        console.log(Ok);
        if (Ok) {
            if (btnOperation) {
                const horario = {
                    id: id,
                    diaSemana: dia,
                    periodo: periodo,
                    disciplina: {
                        id: disciplinaOptions.value
                    },
                    professor: {
                        id: professorOptions.value
                    }
                }

                PutRequest(`${BASE_URL}/horario`, horario, id!).then(go => {
                    window.location.reload();
                })

            } else {
                const horario = {
                    diaSemana: dia,
                    periodo: periodo,
                    disciplina: {
                        id: disciplinaOptions.value
                    },
                    professor: {
                        id: professorOptions.value
                    }
                }
                console.log(horario)
                PutRequest(`${BASE_URL}/turma`, horario, turma!.id).then(go => {
                    window.location.reload();
                });
            }
        }
    }



    function handleDeleteHorario() {
        console.log(id);
        // DeleteRequest(`${BASE_URL}/horario`, id!).then(go => {
        //     window.location.reload();
        // });
    }



    return (
        <HorarioContext.Provider value={{
            id, nome, cursoOptions, turmaOptions, disciplinaOptions, professorOptions,
            formIsOk,
            dia, periodo, turma,
            nomeHandler,
            btnOperation,
            handleClear,
            handleClick,
            handleSubmit,
            handleDeleteHorario,
            selectedCursoHandler,
            selectedTurmaHandler,
            selectedProfessorHandler,
            selectedDisciplinaHandler,
        }}>
            {children}
        </HorarioContext.Provider>
    )
}

export default HorarioContextProvider;