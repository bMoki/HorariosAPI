import ImgIF from 'assets/img/logoIF.png';
import { Link } from 'react-router-dom';

function NavBar() {
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
                                <Link to="/CadastroProf" className="nav-link">Professor</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/CadastroDisciplina" className="nav-link">Disciplina</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/CadastroCurso" className="nav-link">Curso</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/CadastroHorario" className="nav-link">Horário</Link>

                            </li>
                        </ul>

                    </div>
                </div>

            </nav>

        </>
    );
}

export default NavBar;
