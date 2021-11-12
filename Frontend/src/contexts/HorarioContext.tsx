import { DeleteRequest, PutRequest, PostRequest } from "hooks/useAxios";
import { createContext, useState, FC, ChangeEvent, useEffect } from "react";
import { Horario } from "types/horario";
import { options } from "types/options";
import { Turma } from "types/turma";

interface IHorarioContext {
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
    turma: undefined,
}

export const HorarioContext = createContext<IHorarioContext>(defaultState);

const HorarioContextProvider: FC = ({ children }) => {

    let MyStorage = window.sessionStorage
    const [id, setId] = useState<number | undefined>(),
        [btnOperation, setBtnOperation] = useState(false),
        [formIsOk, setFormIsOk] = useState(true),
        [cursoOptions, setCursoOptions] = useState<options>({}),
        [turmaOptions, setTurmaOptions] = useState<options>({}),
        [professorOptions, setProfessorOptions] = useState<options>({}),
        [disciplinaOptions, setDisciplinaOptions] = useState<options>({}),
        [dia, setDia] = useState(""),
        [periodo, setPeriodo] = useState<number | undefined>(undefined),
        [turma, setTurma] = useState<Turma | undefined>(undefined);

    useEffect(() => {
        const storedSelectedCurso = JSON.parse(sessionStorage.getItem('selectedCurso') || '{}');
        const storedSelectedTurma = JSON.parse(sessionStorage.getItem('selectedTurma') || '{}');
        setCursoOptions(storedSelectedCurso);
        setTurmaOptions(storedSelectedTurma);
        sessionStorage.removeItem("selectedCurso");
        sessionStorage.removeItem("selectedTurma");
    }, [])

    function StoreSelected() {
        MyStorage.setItem('selectedCurso', JSON.stringify(cursoOptions));
        MyStorage.setItem('selectedTurma', JSON.stringify(turmaOptions));
    }

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

        if (dia === "") return false;
        if (!periodo) return false;
        if (!turma) return false;
        if (!disciplinaOptions.value) return false;
        if (!professorOptions.value) return false;

        return true;

    }


    function handleSubmit() {
        const Ok = FormValidation();
        setFormIsOk(Ok);
        console.log(Ok);
        if (Ok) {
            StoreSelected();
            if (btnOperation) {
                const horario = {
                    id: id,
                    diaSemana: dia,
                    periodo: periodo,
                    disciplina: {
                        id: disciplinaOptions?.value
                    },
                    professor: {
                        id: professorOptions.value
                    },
                    turma: {
                        id: turma?.id
                    }
                }

                PutRequest(`/horario`, horario, id!).then(go => {
                    window.location.reload();
                })

            } else {
                const horario = {
                    diaSemana: dia,
                    periodo: periodo,
                    disciplina: {
                        id: disciplinaOptions?.value
                    },
                    professor: {
                        id: professorOptions.value
                    },
                    turma: {
                        id: turma?.id
                    }
                }



                PostRequest(`/horario`, horario).then(go => {
                    window.location.reload();
                });
            }
        }
    }


    function handleDeleteHorario() {
        StoreSelected();
        DeleteRequest(`/horario`, id!).then(go => {
            window.location.reload();
        });
    }



    return (
        <HorarioContext.Provider value={{
            id, cursoOptions, turmaOptions, disciplinaOptions, professorOptions,
            formIsOk,
            dia, periodo, turma,
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