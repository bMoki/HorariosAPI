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
import Usuario from 'Pages/Usuario';
import Unauthorized from 'Pages/Unauthorized';

function CustomRoute({ isPrivate, isAdmin, ...rest }: any) {
    const { loading, authenticated, user } = useContext(LoginContext);

    if (loading) {
        return <h1>loading...</h1>
    }

    if (isAdmin && !user?.admin) {
        return <Redirect to="/Unauthorized" />
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
                <CustomRoute path='/Usuario' isPrivate isAdmin>
                    <Usuario />
                </CustomRoute>
                <CustomRoute path='/Login'>
                    <LoginPage />
                </CustomRoute>
                <CustomRoute path='/Unauthorized'>
                    <Unauthorized />
                </CustomRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
