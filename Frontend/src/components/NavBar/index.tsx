import ImgIF from 'assets/img/logoIF.png';
import { LoginContext } from 'contexts/LoginContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';
import { useAxiosFetchById } from 'hooks/useAxiosFetch';
import { UserDetail } from 'types/user';

function NavBar() {
    const { LogOut, user } = useContext(LoginContext);
    const { data } = useAxiosFetchById(`/usuario/info/${user?.sub}`);
    const [userDetail, setUserDetail] = useState<UserDetail>({});

    useEffect(() => {
        setUserDetail(data);
    }, [data])


    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-light border-bottom shadow-sm mb-5">

                <div className="container-fluid p-3">

                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link to="/" className="mx-5">
                        <img src={ImgIF} alt="IF" width="40" className="px-1" />
                    </Link>




                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/Professor" className="nav-link">Professor</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/Aluno" className="nav-link">Aluno</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/Disciplina" className="nav-link">Disciplina</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/Curso" className="nav-link">Curso</Link>

                            </li>

                            <li className="nav-item">
                                <Link to="/Horario" className="nav-link">Horário</Link>

                            </li>

                            {user?.admin ?
                                <li className="nav-item">
                                    <Link to="/Usuario" className="nav-link">Usuário</Link>
                                </li>
                                :
                                ""
                            }

                        </ul>


                        <ul className="navbar-nav me-5 ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropstart">

                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                                    <div className="d-inline align-self-bottom">
                                        <AiOutlineUser className="text-primary fs-3 m-1" />
                                        {userDetail && userDetail.name?.substr(0, userDetail.name.indexOf(' '))}
                                    </div>

                                </div>

                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className="dropdown-header text-center fw-bold ">{userDetail.admin ? "Administrador" : "Usuário"}</li>
                                    <li className="dropdown-item disabled mx-2"><small>{userDetail.username}</small></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="nav-item ">
                                        <Link to="/Perfil" className="nav-link fs-6 mx-3"> Perfil
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="nav-item">
                                        <Link to="/Login" onClick={LogOut} className="nav-link fs-6 mx-3" title="Sair">Sair <FiLogOut className="text-danger fs-5 position-absolute end-0 me-3" /></Link>
                                    </li>
                                </ul>
                            </li>

                        </ul>


                    </div>
                </div>

            </nav>

        </>
    );
}

export default NavBar;
