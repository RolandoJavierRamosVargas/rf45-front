import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Componentes/App';
//import AppCodigo from './Componentes/AppCodigo';
import AppNueva from './Componentes/AppNueva';
import AppNueva2 from './Componentes/AppNueva2';
import LoginFormNombreApellidos from './Componentes/LoginFormNombreApellidos';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router-3';
import LoginForm from './Componentes/LoginForm';
import VistaTablaNuevo from './Componentes/VistaTablaNueva';
import VistaIntermedia from './Componentes/seleccion-intermedia';
import ComponenteEditable from './Componentes/ComponenteEditable';
import Formulario from './Componentes/formulario';
import VistaSeguimientoEgresado from './Componentes/VistaSeguimientoEgresado';
import  AgregarDatosFormacionAcademica  from './Componentes/AgregarDatosFormacionAcademica';
import AgregarDatosFormacionAcademicaSanMarcos from './Componentes/AgregarDatosFormacionAcademicaSanMarcos';
import ImportarDatosAlumno_programa from './Componentes/ImportarDatosAlumno_Programa';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';


class Index extends React.Component {
    render() {
        return(
            <Router history={browserHistory}>
            <Route
                component={() => <LoginForm />}
                path="/">
            </Route>
            
            <Route path="/:name" component={App}></Route>
            <Route path="/filtro/:name" component={VistaIntermedia}></Route>
            <Route path="/vista/nueva" component={AppNueva}></Route>
            <Route path="/vista/nueva2" component={AppNueva2}></Route>
            <Route path="/vista/tabla" component={ VistaTablaNuevo}></Route>
            <Route path="/vista/loginNyA" component={LoginFormNombreApellidos}></Route>
            <Route path="/vista/imprimir" component={ComponenteEditable}></Route>
            <Route path="/formulario/:codigo" component={Formulario}></Route>          
            <Route path="/:name/vista/egresado" component={VistaSeguimientoEgresado}></Route>
            <Route path="/:name/vista/egresado/importarDatosAlumno_programa/:codigo" component={ImportarDatosAlumno_programa}></Route>
            <Route path="/:name/vista/egresado/agregarDatosFormacionAcademicaSanMarcos/:codigo" component={AgregarDatosFormacionAcademicaSanMarcos}></Route>
            <Route path="/:name/vista/egresado/agregarDatosFormacionAcademica/:codigo" component={AgregarDatosFormacionAcademica}></Route>
            
            
          </Router>
          )
      }
      
}

ReactDOM.render(
    <Index/>, document.getElementById('root'));

registerServiceWorker();