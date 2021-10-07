import axios from "axios";
import { createContext, useState, ChangeEvent, FC, useEffect} from "react";
import { BASE_URL } from "utils/requests";
import { mask } from "remask";
import { toast } from "react-toastify";
import { Prof, ProfPage } from "types/prof";

interface IProfessorContext {
    nome:               string,
    sobrenome:          string,
    cpf:                string,
    dataNascimento:     string,
    siape:              string,
    email:              string,
    id:                 number,
    btnOperation:       boolean,
    formIsOk:           boolean,
    searchNome:         string,
    searchSobrenome:    string,
    searchCpf:          string,
    searchSiape:        string,
    myStorage:          Storage,
    page:               ProfPage,

    nomeHandler?:                   (event: ChangeEvent<HTMLInputElement>) => void,
    sobrenomeHandler?:              (event: ChangeEvent<HTMLInputElement>) => void,
    cpfHandler?:                    (event: ChangeEvent<HTMLInputElement>) => void,
    emailHandler?:                  (event: ChangeEvent<HTMLInputElement>) => void,
    siapeHandler?:                  (event: ChangeEvent<HTMLInputElement>) => void,
    dataNascimentoHandler?:         (event: ChangeEvent<HTMLInputElement>) => void,
    searchNomeHandler?:             (event: ChangeEvent<HTMLInputElement>) => void,
    searchSobrenomeHandler?:        (event: ChangeEvent<HTMLInputElement>) => void,
    searchCpfHandler?:              (event: ChangeEvent<HTMLInputElement>) => void,
    searchSiapeHandler?:            (event: ChangeEvent<HTMLInputElement>) => void,
    searchDataNascimentoHandler?:   (event: ChangeEvent<HTMLInputElement>) => void,

    handleSubmit?:          () => void,
    handleClear?:           () => void,
    handleDeleteProfessor?: () => void,
    handleSearch?:          () => void,
    handleClick?:           (item:Prof) => void,
   

    
    
}

const defaultState = {
    nome: "",
    sobrenome: "",
    cpf: "",
    dataNascimento: "",
    siape:"",
    email:"",
    id:0,
    btnOperation:false,
    formIsOk:true,
    searchNome:"",
    searchSobrenome:"",
    searchCpf:"",
    searchSiape:"",
    page: {
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    },
    myStorage: sessionStorage
}

export const ProfessorContext = createContext<IProfessorContext>(defaultState);

const ProfessorContextProvider:FC =({ children }) => {

    var myStorage = window.sessionStorage;


    const [page, setPage] = useState<ProfPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(()=> {
            axios.get(`${BASE_URL}/professor`)
                .then(response => {
                    setPage(response.data);
                    console.log(response.data);
                });
               
        },[])

    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [siape, setSiape] = useState("");
    const [id, setId] = useState(0);
    const [btnOperation, setBtnOperation] = useState(false);
    const [formIsOk, setFormIsOk] = useState(true);

    function nomeHandler(event:ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }
    function cpfHandler(event:ChangeEvent<HTMLInputElement>) {
        setCPF(mask(event.target.value, ['999.999.999-99']));
    }
    function sobrenomeHandler(event:ChangeEvent<HTMLInputElement>) {
        setSobrenome(event.target.value);
    }
    function emailHandler(event:ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function dataNascimentoHandler(event:ChangeEvent<HTMLInputElement>) {
        setDataNascimento(mask(event.target.value, ['99/99/9999']));
    }
    function siapeHandler(event:ChangeEvent<HTMLInputElement>) {
        setSiape(mask(event.target.value, ['9999999']));
    }

    //Search----
    const [searchNome,setSearchNome] = useState("");
    const [searchSobrenome,setSearchSobrenome] = useState("");
    const [searchCpf,setSearchCpf] = useState("");
    const [searchSiape,setSearchSiape] = useState("");

    function searchNomeHandler(event:ChangeEvent<HTMLInputElement>) {
        setSearchNome(event.target.value);
    }
    function searchSobrenomeHandler(event:ChangeEvent<HTMLInputElement>) {
        setSearchSobrenome(event.target.value);
    }
    function searchCpfHandler(event:ChangeEvent<HTMLInputElement>) {
        setSearchCpf(event.target.value);
    }
    function searchSiapeHandler(event:ChangeEvent<HTMLInputElement>) {
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

    window.onload = function () {

        if (myStorage.getItem("toast")) {
            switch (myStorage.getItem("toast")) {
                case "POST":

                    if (myStorage.getItem("postSuccess") === '1') {
                        toast.success(myStorage.getItem("res"));
                        myStorage.removeItem("res");

                    } else {
                        if (myStorage.getItem("postSuccess") === '0') {
                            toast.error(myStorage.getItem("errorMessage"));
                            myStorage.removeItem("errorMessage");
                        }
                    }

                    myStorage.removeItem("postSuccess");
                    break;

                case "PUT":

                    if (myStorage.getItem("putSuccess") === '1') {
                        toast.success(myStorage.getItem("res"));
                        myStorage.removeItem("res");
                    } else {
                        if (myStorage.getItem("putSuccess") === '0') {
                            toast.error("Ocorreu um erro " + myStorage.getItem("errorMessage"));
                            myStorage.removeItem("errorMessage");
                        }
                    }

                    myStorage.removeItem("putSuccess");
                    break;

                case "DELETE":

                    if (myStorage.getItem("deleteSuccess") === '1') {
                        toast.success(myStorage.getItem("res"));
                        myStorage.removeItem("res");
                    } else {
                        if (myStorage.getItem("deleteSuccess") === '0') {
                            toast.error("Ocorreu um erro " + myStorage.getItem("errorMessage"));
                            myStorage.removeItem("errorMessage");
                        }
                    }

                    myStorage.removeItem("deleteSuccess");
                    break;
                default:

            }
            myStorage.removeItem("toast");

        }
    }

    function handleClick(item:Prof) {
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

                const profeForPutMethod = {
                    id: id,
                    nome: nome,
                    sobrenome: sobrenome,
                    cpf: cpf,
                    email: email,
                    dataNascimento: data,
                    siape: siape
                }

                myStorage.setItem("toast", "PUT");


                PutRequest(profeForPutMethod).then(go => {
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

                myStorage.setItem("toast", "POST");

                PostRequest(profe).then(go => {
                    window.location.reload();
                });
            }
        }
    }

    function handleDeleteProfessor() {
        myStorage.setItem("toast", "DELETE");

        DeleteRequest().then(go => {
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

    function handleSearch(){

    }
    //ASYNC FUNCTIONS------------------------------------------------Esperam o resultado para seguir em frente
    async function PostRequest(profe:Prof) {
        try {
            const res = await axios.post(`${BASE_URL}/professor`, profe);
            myStorage.setItem("postSuccess", '1');
            myStorage.setItem("res", res.data.message);
        } catch (err:any) {
            myStorage.setItem("postSuccess", '0');
            myStorage.setItem("errorMessage", err.response.data.message);
        }

        return true;

    }

    async function PutRequest(profeForPutMethod:Prof) {
        try {
            const res = await axios.put(`${BASE_URL}/professor/${profeForPutMethod.id}`, profeForPutMethod);
            myStorage.setItem("putSuccess", '1');
            myStorage.setItem("res", res.data.message);
        } catch (err:any) {
            myStorage.setItem("putSuccess", '0');
            myStorage.setItem("errorMessage", err.response.data.message);
        }

        return true;
    }

    async function DeleteRequest() {
        try {
            const res = await axios.delete(`${BASE_URL}/professor/${id}`);
            myStorage.setItem("deleteSuccess", '1');
            myStorage.setItem("res", res.data.message);
        } catch (err:any) {
            myStorage.setItem("deleteSuccess", '0');
            myStorage.setItem("errorMessage", err.response.data.message);
        }

        return true;
    }

    //---------------------------------------------------------------------------

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
            myStorage, formIsOk,
            page
        }
        }>

            {children}

        </ProfessorContext.Provider>
    )
};

export default ProfessorContextProvider;