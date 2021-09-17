import CadastroProf from 'Pages/CadastroProf';
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
            </Switch>
       </BrowserRouter>
    );
}

export default Routes;
