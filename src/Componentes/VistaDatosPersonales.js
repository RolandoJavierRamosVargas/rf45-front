import React from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { browserHistory } from 'react-router-3';
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert';
import Select from 'react-select'
import { KeyObject } from 'crypto';
import Distritos from './Distritos';


class VistaDatosPersonales extends React.Component {



    constructor(props) {
        super(props);

        dni: '',
        this.state = {
            codigo: this.props.codigo,
            id:23,
            apePaterno: "",
            apeMaterno: "",
            nombre: "",
            fechaNacimiento: "",
            domicilioActual: "aea",
            distrito: "",
            ubigeo:"",
            nTelefFijo: "",
            nTelefCelular: "",
            correoPersonal: "",
            correoLaboral: "",
            arrayDistritosLima:[],
            estadoDomicilio:false
        }


        this.onSubmitDatosPersonales = this.onSubmitDatosPersonales.bind(this);
        console.log(2);


    }

    //RENDERIZADO INFINITO
    componentDidMount() {
        fetch(CONFIG + 'mse/alumno/buscar/' + this.state.codigo)
            .then((response) => {
                return response.json();
            })
            .then((alumno) => {
                console.log("---Alumno------Alumno------Alumno------Alumno------Alumno------Alumno---");
                console.log(alumno);
                this.setState({
                    id:this.state.id,
                    apePaterno: alumno.apellidoPaterno,
                    apeMaterno: alumno.apellidoMaterno,
                    nombre: alumno.nombre,
                    fechaNacimiento: alumno.fechaNacimiento,
                    // domicilioActual: alumno.domicilioActual,
                    distrito: alumno.distrito,
                    ubigeo:alumno.ubigeo,
                    nTelefFijo: alumno.telefonoFijo,
                    nTelefCelular: alumno.telefonoCelular,
                    correoPersonal: alumno.correoPersonal,
                    correoLaboral: alumno.correoLaboral,
                });
            })
            .catch((error) => {
                swal("Algo salió mal", "", "warning")
                console.log(error);
            });

        fetch(CONFIG+'mse/domicilio/buscar/'+this.state.id)
        .then((response)=>{
            return response.json();
        })
        .then((alumnoDomicilio)=>{
            console.log("---AlumnoDomicilio---");
            console.log(alumnoDomicilio);

            this.setState({
                domicilioActual:alumnoDomicilio.domicilio,
                ubigeo:alumnoDomicilio.ubigeo.trim(),
                estadoDomicilio:true
            })
        })
        .catch((error)=>{
            swal("Falta registrar su domicilio" , " ", "warning")
            console.log(error);


        })

    }

    setField(e) {

        console.log(e.target.name);
        console.log(e.target.value);


        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

        let distritosLima=this.state.arrayDistritosLima;
        let contenido;


        if(distritosLima){
            console.log("Se cargaron correctamente los distritos de lima ",distritosLima);

            contenido=(
                <div  className="contenedor">
                <div className="">
                    <h2 className="titulo">Datos Personales</h2>
                    <div className="input-dato">
                         <label className="label-dato">
                            N° DE DOCUMENTO DE IDENTIDAD (DNI O CARNE DE EXTRANJERÍA):
                            <input type="text" name="name" value={this.state.codigo} disabled />
                        </label>
                        <label className="label-dato">
                            APELLIDO PATERNO:
                            <input type="text" name="name" value={this.state.apePaterno} disabled />
                        </label>
                        <label className="label-dato">
                            APELLIDO MATERNO:
                            <input type="text" name="name" value={this.state.apeMaterno} disabled />
                        </label>
                        <label className="label-dato">
                            NOMBRES:
                            <input type="text" name="name" value={this.state.nombre} disabled />
                        </label>
                        <label className="label-dato">
                            FECHA DE NACIMIENTO:
                            <input type="date" name="name" value={this.state.fechaNacimiento} disabled />
                        </label>
                         <label className="label-dato">
                            DOMICILIO ACTUAL:
                            <input type="text" name="domicilioActual" value={this.state.domicilioActual} id="domicilioActual" onChange={(e) => this.setField(e)} required  disabled/>
                        </label>
                        <label className="label-dato">
                            DISTRITO:
                            <div className="form-group">

                              <select  className="form-control" name="ubigeo" value={this.state.ubigeo} id="ubigeo" onChange={(e) => this.setField(e)} disabled>
                                <option>--Seleccione una opcion--</option>
                                {Object.keys(distritosLima).map(distrito=>(
                                    <Distritos
                                        key={distrito}
                                        id={distritosLima[distrito].id}
                                        distrito={distritosLima[distrito].nombre}
                                    />
                                    ))}
                              </select>
                            </div>
                        </label> 
                         <br></br><br></br>
                         {/* <div className="row">
                            <label className="label-dato col-md-8">

                               Telefono
                                <input type="text" name="telefono" required disabled />
                            </label>


                            <div className="col-md-4">
                                <label class="custom-control custom-radio">
                                    <input className="custom-control-input" type="radio" name="telefono" id="exampleRadios1" value="fijo" disabled/>
                                    <span class="custom-control-indicator"></span><br></br>
                                    <span class="custom-control-description">Fijo</span>
                                </label>
                                <label class="custom-control custom-radio">
                                    <input className="custom-control-input" type="radio" name="telefono" id="exampleRadios2" value="celular" disabled/>
                                    <span class="custom-control-indicator"></span>
                                    <span class="custom-control-description">Celular</span>
                                </label>
                            </div>
                        </div>  */}
                         <label className="label-dato col-md-8">Telefono</label>
                         <div className="container " width="300px">
                            <table className="">
                                <thead className="text-center">
                                    <tr>
                                        <th className="text-center">Tipo</th>
                                        <th className="text-center">Numero</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <td className="text-center">Fijo</td>
                                        <td ><input className="text-center tableInput1" type="text" value={this.state.nTelefFijo}  name="nTelefFijo" onChange={(e) => this.setField(e) }  required disabled/></td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">Celular</td>
                                        <td><input className="text-center tableInput2" type="text" value={this.state.nTelefCelular}  name="nTelefCelular" onChange={(e) => this.setField(e) }  required disabled/></td>
                                    </tr>

                                </tbody>

                            </table>

                            <div className="container">
                                <div className="row">
                                    <div className="col col-md-12 text-center">
                                            <button className="btn btn-primary mr-5" disabled>
                                                    Añadir
                                            </button>
                                            <button className="btn btn-danger" disabled>
                                                    Eliminar
                                            </button>
                                    </div>

                                </div>
                            </div>

                     </div>

                        {/* <div className="row">
                            <label className="label-dato col-md-8">

                                CORREO ELECTRÓNICO
                                <input type="text" name="correo" required />
                            </label>

                            <div className="col-md-4 mt-2">
                                <label class="custom-control custom-radio">
                                    <input className="custom-control-input" type="radio" name="radio" id="exampleRadios3" value="personal" />
                                    <span class="custom-control-indicator"></span>
                                    <span class="custom-control-description">Personal</span>
                                </label>
                                <label class="custom-control custom-radio">
                                    <input className="custom-control-input" type="radio" name="radio" id="exampleRadios4" value="laboral" />
                                    <span class="custom-control-indicator"></span>
                                    <span class="custom-control-description">Laboral</span>
                                </label>
                            </div>
                        </div> */}
                         
                         <label className="label-dato col-md-8">Correo Electronico</label>
                         <div className="container " width="300px">
                            <table className="">
                                <thead className="text-center">
                                    <tr>
                                        <th className="text-center">Tipo</th>
                                        <th className="text-center">Email</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <tr>
                                        <td className="text-center">Personal</td>
                                        <td ><input className="text-center tableInput1" type="text" value={this.state.correoPersonal}  name="correoPersonal" onChange={(e) => this.setField(e) }  required disabled/></td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">Laboral</td>
                                        <td><input className="text-center tableInput2" type="text" value={this.state.correoLaboral}  name="correoLaboral" onChange={(e) => this.setField(e) }  required disabled/></td>
                                    </tr>

                                </tbody>

                            </table>

                            <div className="container">
                                <div className="row">
                                    <div className="col col-md-12 text-center">
                                            <button className="btn btn-primary mr-5" disabled>
                                                    Añadir
                                            </button>
                                            <button className="btn btn-danger" disabled>
                                                    Eliminar
                                            </button>
                                    </div>

                                </div>
                            </div>

                     </div>

                       
                       
                        <div className="row">
                            <div className="col col-md-6 col-lg-12 ">

                                <div className="text-center">
                                   <input type="button" value="Modificar" className="btn btn-warning" onClick={this.cambioEstadoCampo} />
                               </div>
                               <div className="text-right">
                               <input type="submit" value="Enviar" className="btn btn-success right" onClick={this.onSubmitDatosPersonales} />
                               </div>
                            </div>

                        </div>


                    </div>

                </div>
            </div>

            )

        }else{
            contenido=(
                <h1>Espere un momento porfavor</h1>
            )
        }
        return (
           contenido
        );
    }


    componentWillMount(){
        let urlApi="https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/master/json/ubigeo_peru_2016_distritos.json";
        fetch(urlApi)
        .then(respuesta=>{
            return respuesta.json();
        })
        .then(respuesta2=>{
             console.log(typeof respuesta2);
            let distritosLima=this.buscarLima(respuesta2);

            if(distritosLima===null){
                console.log("No hay ningun distrito");
                console.log(distritosLima);
            }else{

                console.log("Tenemos los distritos de lima");
                this.setState({
                    arrayDistritosLima:distritosLima
                })
            }

        })
    }

    //Deshabilitar y habilitar campos
    cambioEstadoCampo = (e) =>{
        e.preventDefault();
        console.log("Evaluaremos el estado");
        let domicilioActual=document.getElementById('domicilioActual');
        let ubigeo=document.getElementById('ubigeo');
        let tableGenericInput1=document.getElementsByClassName('tableInput1');
        let tableGenericInput2=document.getElementsByClassName('tableInput2');

         domicilioActual.disabled=!domicilioActual.disabled;
         ubigeo.disabled=!ubigeo.disabled;
        
        
        tableGenericInput1[0].disabled=!tableGenericInput1[0].disabled;
        tableGenericInput2[0].disabled=!tableGenericInput2[0].disabled;
        tableGenericInput1[1].disabled=!tableGenericInput1[1].disabled;
        tableGenericInput2[1].disabled=!tableGenericInput2[1].disabled;
        console.log("Llegue hasta el final");
    }

    //Plantilla para renderizar las tablas
    // tablasRender(tipo,text1,text2,value1,value2){
    //     let tablaGenerica=(
    //         <div className="container " width="300px">
    //         <table className="">
    //             <thead className="text-center">
    //                 <tr>
    //                     <th className="text-center">Tipo</th>
    //                     <th className="text-center">{tipo}</th>
    //                 </tr>
    //             </thead>
    //             <tbody >
    //                 <tr>
    //                     <td className="text-center">{text1}</td>
    //                     <td ><input className="text-center tableInput1" type="text" value="Galletas"  name={tipo} required disabled/></td>
    //                 </tr>
    //                 <tr>
    //                     <td className="text-center">{text2}</td>
    //                     <td><input className="text-center tableInput2" type="text" value={value2}  name={tipo} required disabled/></td>
    //                 </tr>

    //             </tbody>

    //         </table>

    //             <div className="container">
    //                 <div className="row">
    //                     <div className="col col-md-12 text-center">
    //                         <button className="btn btn-primary mr-5">
    //                                 Añadir
    //                         </button>
    //                         <button className="btn btn-danger">
    //                                 Eliminar
    //                         </button>
    //                     </div>

    //                 </div>
    //             </div>

    //         </div>
    //     )
    //     return tablaGenerica;
    // }

    //Metodo para guardar o editar el domicilio de una persona
    onSubmitGeneral=(e)=>{
        e.preventDefault();
        if(this.state.estadoDomicilio){
            console.log("Se va a editar el domicilio de una persona");

            this.onSubmitEditarDomicilio(e);
        }else{
            console.log("Se va a Guardar el domicilio de una persona");
            this.onSubmitGuardarDomicilioPersona(e);
        }

    }

    //Metodo para guardar el domicilio de una persona
    onSubmitGuardarDomicilioPersona = (e)=>{

        e.preventDefault();
        console.log("---DATOS A ENVIAR---");
        console.log(JSON.stringify({
            id:this.state.id,
            domicilio:this.state.domicilioActual,
            ubigeo:this.state.ubigeo
        }));
        fetch(CONFIG+ 'mse/domicilio/guardar/',{
            method:'POST',
            body:JSON.stringify({
                id:this.state.id,
                domicilio:this.state.domicilioActual,
                ubigeo:this.state.ubigeo
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            swal("Guardado Correctamente", "", "success");
            return response.json();
        })
        .then((alumno) => {
            console.log("---RESPUESTA---");
            console.log(alumno);
        })
        .catch((error) => {
            swal("Algo salió mal", "", "warning");
            console.log(error);
        });
    }

    //Metodo para editar el Domicilio
    onSubmitEditarDomicilio=(e) =>{
        e.preventDefault();
        fetch(CONFIG + 'mse/domicilio/editar/', {
            method: 'PUT',
            body: JSON.stringify({
                id:this.state.id,
                domicilio:this.state.domicilioActual,
                ubigeo:this.state.ubigeo
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                swal("Actualizado Correctamente", "", "success");
                return response.json();
            })
            .then((alumno) => {
                console.log("---RESPUESTA---");
                console.log(alumno);
            })
            .catch((error) => {
                swal("Algo salió mal", "", "warning");
                console.log(error);
            });



    }


    //Metodo para actualizar los datos personales de un alumno
    onSubmitDatosPersonales = (e) => {

        e.preventDefault();
        console.log("---ENVIA---");
        console.log(JSON.stringify({
            codigoAlumno: this.state.codigo,
            dni: this.state.dni,
            apellidoPaterno: this.state.apePaterno,
            apellidoMaterno: this.state.apeMaterno,
            nombre: this.state.nombre,
            fechaNacimiento: this.state.fechaNacimiento,
            domicilioActual: this.state.domicilioActual,
            distrito: this.state.distrito,
            ubigeo:this.state.ubigeo,
            telefonoFijo: this.state.nTelefFijo,
            telefonoCelular: this.state.nTelefCelular,
            correoPersonal: this.state.correoPersonal,
            correoLaboral: this.state.correoLaboral,
        }));

        fetch(CONFIG + 'mse/alumno/actualizar/', {
            method: 'PUT',
            body: JSON.stringify({
                codigoAlumno: this.state.codigo,
                dni: this.state.dni,
                apellidoPaterno: this.state.apePaterno,
                apellidoMaterno: this.state.apeMaterno,
                nombre: this.state.nombre,
                fechaNacimiento: this.state.fechaNacimiento,
                domicilioActual: this.state.domicilioActual,
                distrito: this.state.distrito,
                ubigeo:this.state.ubigeo,
                telefonoFijo: this.state.nTelefFijo,
                telefonoCelular: this.state.nTelefCelular,
                correoPersonal: this.state.correoPersonal,
                correoLaboral: this.state.correoLaboral,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                swal("Actualizado Correctamente", "", "success");
                return response.json();
            })
            .then((alumno) => {
                console.log("---RESPUESTA---");
                console.log(alumno);
            })
            .catch((error) => {
                swal("Algo salió mal", "", "warning");
                console.log(error);
            });

            //Envior los datos del domicilio y ubigeo
            this.onSubmitGeneral(e);
    }

    //Metodo para buscar a lima desde la API
    buscarLima(valor){
        let arrayDistritos = [];
        for (let distrito of valor) {
            if(distrito.province_id === "1501"){
                let distritoObjeto={
                    id:distrito.id,
                    nombre:distrito.name
                }
                arrayDistritos.push(distritoObjeto);
            }
        }
        return arrayDistritos

    }
}

export default VistaDatosPersonales;