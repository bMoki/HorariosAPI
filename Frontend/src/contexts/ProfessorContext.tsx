import { createContext, useState, ChangeEvent, FC } from "react";
import { BASE_URL } from "utils/requests";
import { mask } from "remask";
import { Prof } from "types/prof";
import { PostRequest, PutRequest, DeleteRequest } from "hooks/useAxios";

interface IProfessorContext {
    nome: string,
    sobrenome: string,
    cpf: string,
    dataNascimento: string,
    siape: string,
    email: string,
    id: number,
    btnOperation: boolean,
    formIsOk: boolean,
    searchNome: string,
    searchSobrenome: string,
    searchCpf: string,
    searchSiape: string,
    // professor: ProfPage,
    // fetchError: string | null,
    // isLoading: boolean,

    nomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    sobrenomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    cpfHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    emailHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    siapeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    dataNascimentoHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    searchNomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    searchSobrenomeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    searchCpfHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    searchSiapeHandler?: (event: ChangeEvent<HTMLInputElement>) => void,
    searchDataNascimentoHandler?: (event: ChangeEvent<HTMLInputElement>) => void,

    handleSubmit?: () => void,
    handleClear?: () => void,
    handleDeleteProfessor?: () => void,
    handleSearch?: () => void,
    handleClick?: (item: Prof) => void,




}

const defaultState = {
    nome: "",
    sobrenome: "",
    cpf: "",
    dataNascimento: "",
    siape: "",
    email: "",
    id: 0,
    btnOperation: false,
    formIsOk: true,
    searchNome: "",
    searchSobrenome: "",
    searchCpf: "",
    searchSiape: "",
    // professor: {
    //     first: true,
    //     last: true,
    //     number: 0,
    //     totalElements: 0,
    //     totalPages: 0
    // },
    // fetchError: null,
    // isLoading: false,
}

export const ProfessorContext = createContext<IProfessorContext>(defaultState);

const ProfessorContextProvider: FC = ({ children }) => {

    // const { data, fetchError, isLoading } = useAxiosFetchPage(`${BASE_URL}/professor`);
    // const [professor, setProfessor] = useState<ProfPage>({
    //     first: true,
    //     last: true,
    //     number: 0,
    //     totalElements: 0,
    //     totalPages: 0
    // });

    // useEffect(() => {
    //         setProfessor(data);
    //     }, [data])

    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [siape, setSiape] = useState("");
    const [id, setId] = useState(0);
    const [btnOperation, setBtnOperation] = useState(false);
    const [formIsOk, setFormIsOk] = useState(true);

    function nomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }
    function cpfHandler(event: ChangeEvent<HTMLInputElement>) {
        setCPF(mask(event.target.value, ['999.999.999-99']));
    }
    function sobrenomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setSobrenome(event.target.value);
    }
    function emailHandler(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function dataNascimentoHandler(event: ChangeEvent<HTMLInputElement>) {
        setDataNascimento(mask(event.target.value, ['99/99/9999']));
    }
    function siapeHandler(event: ChangeEvent<HTMLInputElement>) {
        setSiape(mask(event.target.value, ['9999999']));
    }

    //Search----
    const [searchNome, setSearchNome] = useState("");
    const [searchSobrenome, setSearchSobrenome] = useState("");
    const [searchCpf, setSearchCpf] = useState("");
    const [searchSiape, setSearchSiape] = useState("");

    function searchNomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setSearchNome(event.target.value);
    }
    function searchSobrenomeHandler(event: ChangeEvent<HTMLInputElement>) {
        setSearchSobrenome(event.target.value);
    }
    function searchCpfHandler(event: ChangeEvent<HTMLInputElement>) {
        setSearchCpf(event.target.value);
    }
    function searchSiapeHandler(event: ChangeEvent<HTMLInputElement>) {
        setSearchSiape(event.target.value);
    }


    //----------



    function FormValidation() {
        var Ok = true;

        if (nome === "") {
            Ok = false;
        }

        if (cpf.length < 14) {
            Ok = false;
        }

        if (sobrenome === "") {
            Ok = false;
        }

        if (email === "") {
            Ok = false;
        }

        if (dataNascimento.length < 10) {
            Ok = false;
        }

        if (siape === "") {
            Ok = false;
        }

        setFormIsOk(Ok)
        return Ok;

    }

    function handleClick(item: Prof) {
        const data = item?.dataNascimento?.slice(8, 10) + "/" + item?.dataNascimento?.slice(5, 7) + "/" + item?.dataNascimento?.slice(0, 4);
        setNome(item?.nome === undefined ? "" : item.nome);
        setSobrenome(item?.sobrenome === undefined ? "" : item.sobrenome);
        setCPF(item?.cpf === undefined ? "" : item.cpf);
        setEmail(item?.email === undefined ? "" : item.email);
        setDataNascimento(data);
        setSiape(item?.siape === undefined ? "" : item.siape);
        setId(item?.id === undefined ? 0 : item.id);
        setBtnOperation(true)
    }

    //Buttons---------------------------------------------------
    function handleSubmit() {

        const Ok = FormValidation();

        if (Ok) {
            const data = dataNascimento.slice(6, 10) + '-' + dataNascimento.slice(3, 5) + '-' + dataNascimento.slice(0, 2);

            if (btnOperation) {

                const profe = {
                    id: id,
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    email: email,
                    dataNascimento: data,
                    siape: siape
                }

                PutRequest(`${BASE_URL}/professor`, profe, profe.id).then(go => {
                    window.location.reload();
                })

            } else {
                const profe = {
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    email: email,
                    dataNascimento: data,
                    siape: siape
                }

                PostRequest(`${BASE_URL}/professor`, profe).then(go => {
                    window.location.reload();
                });


            }
        }
    }

    function handleDeleteProfessor() {
        DeleteRequest(`${BASE_URL}/professor`, id).then(go => {
            window.location.reload();
        });
    }




    function handleClear() {
        setNome("");
        setSobrenome("");
        setCPF("");
        setEmail("");
        setDataNascimento("");
        setSiape("");
        setId(0);
        setBtnOperation(false);
    }

    function handleSearch() {

    }

    return (
        <ProfessorContext.Provider value={{
            id,
            nome,
            cpf,
            sobrenome,
            email,
            dataNascimento,
            siape,
            searchNome,
            searchCpf,
            searchSiape,
            searchSobrenome,
            searchNomeHandler,
            searchCpfHandler,
            searchSiapeHandler,
            searchSobrenomeHandler,
            handleSearch,
            nomeHandler,
            cpfHandler,
            sobrenomeHandler,
            emailHandler,
            dataNascimentoHandler,
            siapeHandler,
            handleClick,
            handleSubmit,
            btnOperation,
            handleClear,
            handleDeleteProfessor,
            formIsOk,
            // professor, fetchError,
            // isLoading,
        }
        }>

            {children}

        </ProfessorContext.Provider>
    )
};

export default ProfessorContextProvider;