import Professor from 'Pages/Professor';
import Disciplina from 'Pages/Disciplina';
import Curso from 'Pages/Curso'
import Home from 'Pages/Home';
import Horario from 'Pages/Horario';
import Aluno from 'Pages/Aluno';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import LoginPage from 'Pages/Login';
import { useContext, useEffect } from 'react';
import { LoginContext } from 'contexts/LoginContext';
import { Toast } from 'utils/storageManager';

function CustomRoute({ isPrivate, ...rest }: any) {
    const { loading, authenticated } = useContext(LoginContext);
  
    if (loading) {
        return <h1>loading...</h1>
    }

    if (isPrivate && !authenticated) {
        return <Redirect to="/Login" />
    }
    return <Route {...rest} />;
}

function Routes({ history }: any) {

    useEffect(() => {
        Toast();
    }, [])


    return (

        <BrowserRouter>
            <Switch>
                <CustomRoute path="/" isPrivate exact>
                    <Home />
                </CustomRoute>
                <CustomRoute path="/Professor" isPrivate>
                    <Professor />
                </CustomRoute>
                <CustomRoute path='/Disciplina' isPrivate>
                    <Disciplina />
                </CustomRoute>
                <CustomRoute path='/Curso' isPrivate>
                    <Curso />
                </CustomRoute>
                <CustomRoute path='/Horario' isPrivate>
                    <Horario />
                </CustomRoute>
                <CustomRoute path='/Aluno' isPrivate>
                    <Aluno />
                </CustomRoute>
                <CustomRoute path='/Login'>
                    <LoginPage />
                </CustomRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
