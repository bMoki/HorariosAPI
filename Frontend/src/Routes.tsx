import Professor from 'Pages/Professor';
import Disciplina from 'Pages/Disciplina';
import Curso from 'Pages/Curso'
import Home from 'Pages/Home';
import Horario from 'Pages/Horario';
import Aluno from 'Pages/Aluno';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/Professor">
                    <Professor />
                </Route>
                <Route path='/Disciplina'>
                    <Disciplina />
                </Route>
                <Route path='/Curso'>
                    <Curso />
                </Route>
                <Route path='/Horario'>
                    <Horario />
                </Route>
                <Route path='/Aluno'>
                    <Aluno />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
