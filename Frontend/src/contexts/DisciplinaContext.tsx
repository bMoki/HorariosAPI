import { createContext, useState, FC, ChangeEvent } from "react";
import { Disciplina } from "types/disciplina";





interface IDisciplinaContext {
    nome: string,
    id: number,
    myStorage: Storage,
    btnOperation: boolean,

    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void
    handleClick?: (item: Disciplina) => void,
    handleClear?: () => void,
    handleDeleteDisciplina?: () => void,

}

const defaultState = {
    nome: "",
    id: 0,
    myStorage: sessionStorage,
    btnOperation: false,
}

export const DisciplinaContext = createContext<IDisciplinaContext>(defaultState);

const DisciplinaContextProvider: FC = ({ children }) => {
    var myStorage = window.sessionStorage;

   
    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [btnOperation, setBtnOperation] = useState(false);

    // const [disciplina, setDisciplina] = useState<DisciplinaPage>({
    //     first: true,
    //     last: true,
    //     number: 0,
    //     totalElements: 0,
    //     totalPages: 0
    // });

    // const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/disciplina`);


    // useEffect(() => {
    //     setDisciplina(data);
    // }, [data])

    function nomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }

    function handleClick(item: Disciplina) {
        setNome(item?.nome === undefined ? "" : item.nome);
        setId(item?.id === undefined ? 0 : item.id);
        setBtnOperation(true);
    }

    function handleClear() {
        setNome("");
        setId(0);
        setBtnOperation(false);
    }

    function handleDeleteDisciplina() {
        console.log("delete");
    }



    return (
        <DisciplinaContext.Provider value={{
            id, nome, myStorage,
            nomeHandler, handleClick,
            btnOperation,
            handleClear,
            handleDeleteDisciplina
        }}>
            {children}
        </DisciplinaContext.Provider>
    )
}

export default DisciplinaContextProvider;