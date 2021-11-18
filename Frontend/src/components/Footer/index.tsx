import { AiFillGithub } from "react-icons/ai";

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-dark">
            <div className="container">
                <p className="text-light">
                    <small>
                        <strong>IFRS - Horarios</strong><br />
                        Instituto Federal do Rio Grande do Sul - IFRS
                    </small>
                    <br />
                </p>
                <p className="text-light">
                    <AiFillGithub className="fs-3" /> <a href="https://github.com/bMoki" target="_blank" rel="noreferrer" className="text-decoration-none text-light"> Breno Sonda</a>
                    <br/>
                </p>
                <p>
                <small><a href="https://storyset.com/web" target="_blank" rel="noreferrer" className="text-decoration-none text-muted">Web illustrations by Storyset</a></small>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
