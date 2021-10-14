import CadastroProf from 'Pages/CadastroProf';
import CadastroDisciplina from 'Pages/CadastroDisciplina';
import CadastroCurso from 'Pages/CadastroCurso'
import Home from 'Pages/Home';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

function Routes() {
    return (
       <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/CadastroProf">
                        <CadastroProf />
                </Route>
                <Route path='/CadastroDisciplina'>
                    <CadastroDisciplina/>
                </Route>
                <Route path='/CadastroCurso'>
                    <CadastroCurso/>
                </Route>
            </Switch>
       </BrowserRouter>
    );
}

export default Routes;
