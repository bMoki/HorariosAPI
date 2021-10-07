import CadastroProf from 'Pages/CadastroProf';
import CadastroDisciplina from 'Pages/CadastroDisciplina';
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
            </Switch>
       </BrowserRouter>
    );
}

export default Routes;
