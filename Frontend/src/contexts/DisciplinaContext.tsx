import axios from "axios";
import { createContext, useState, FC, useEffect, ChangeEvent } from "react";
import { Disciplina } from "types/disciplina";
import { BASE_URL } from "utils/requests";
import useAxiosFetch from "hooks/useAxiosFetch";

interface IDisciplinaContext {
    nome: string,
    id: number,
    myStorage: Storage,
    disciplina: Disciplina[],
    fetchError:string | null,
    isLoading: boolean,
    btnOperation:boolean,

    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void
    handleClick?:(item:Disciplina) => void,
    handleClear?:()=>void,
    handleDeleteDisciplina?:()=>void,
   
}

const defaultState = {
    nome: "",
    id: 0,
    myStorage: sessionStorage,
    disciplina: [],
    fetchError: null,
    isLoading:false,
    btnOperation:false,
}

export const DisciplinaContext = createContext<IDisciplinaContext>(defaultState);

const DisciplinaContextProvider: FC = ({ children }) => {
    var myStorage = window.sessionStorage;

    const [disciplina, setDisciplina] = useState<Disciplina[]>([]);
    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [btnOperation, setBtnOperation] = useState(false);

    const { data, fetchError, isLoading } = useAxiosFetch(`${BASE_URL}/disciplina`);
    

    useEffect(() => {
        setDisciplina(data);
    }, [data])

    function nomeHandler(event:ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }

    function handleClick(item:Disciplina){
        setNome(item?.nome === undefined? "" : item.nome);
        setBtnOperation(true);
    }

    function handleClear(){
        setNome("");
        setBtnOperation(false);
    }

    function handleDeleteDisciplina(){
        console.log("delete");
    }



    return (
        <DisciplinaContext.Provider value={{
            id, nome, myStorage,disciplina,
            fetchError,isLoading,
            nomeHandler,handleClick,
            btnOperation,
            handleClear,
            handleDeleteDisciplina
        }}>
            {children}
        </DisciplinaContext.Provider>
    )
}

export default DisciplinaContextProvider;