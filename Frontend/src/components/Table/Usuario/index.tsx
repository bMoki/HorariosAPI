import EmptyMessage from "components/EmptyMessage";
import Error504Message from "components/Error/Error504Message";
import LoadingSpinner from "components/Loading";
import Pagination from "components/Pagination";
import { UsuarioContext } from "contexts/UsuarioContext";
import { useAxiosFetchPage } from "hooks/useAxiosFetch";
import { usePage } from "hooks/usePage";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { UserPage } from "types/user";

function TableUsuario() {

    const { handleClick } = useContext(UsuarioContext);

    const { activePage, changePage } = usePage();
    const { data, fetchError, isLoading } = useAxiosFetchPage(`/usuario/info?page=${activePage}`);
    const [userDetail, setUserDetail] = useState<UserPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });


    useEffect(() => {
        setUserDetail(data);
    }, [data])

    return (
        <>
            <div className="row">
                {isLoading &&
                    <div className="d-flex justify-content-center">
                        <LoadingSpinner margin="mt-5 mb-5"/>
                    </div>}
                {fetchError && <Error504Message size={300} />}

                {!isLoading && !fetchError && (userDetail.totalElements > 0 ?
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Administrador</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDetail.content?.map(item => (
                                    <tr key={item.id} onClick={() => handleClick!(item)}>
                                        <td className="align-middle" height="50px">{item.name}</td>
                                        <td className="align-middle">{item.username}</td>
                                        <td className="align-middle">{
                                            item.admin ?
                                                <AiOutlineCheck className="text-primary fs-4" />
                                                :
                                                <AiOutlineClose className="text-danger fs-4" />
                                        }</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    :
                    <EmptyMessage text="Sem usuário para mostrar" />
                )}
            </div>
            <Pagination page={userDetail} onPageChange={changePage} />
        </>
    );
}

export default TableUsuario;
