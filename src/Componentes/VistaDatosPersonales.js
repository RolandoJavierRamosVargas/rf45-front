import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { browserHistory } from "react-router-3";
import CONFIG from "../Configuracion/Config";
import swal from "sweetalert";
import Select from "react-select";
import { KeyObject } from "crypto";
import Distritos from "./Distritos";
import Telefono from "./Telefono";
import Correo from "./Correo";
import TiposTelefono from "./TiposTelefono";

class VistaDatosPersonales extends React.Component {
  constructor(props) {
    super(props);

    dni: "",
      (this.state = {
        codigo: this.props.codigo,
        id: 23,
        apePaterno: "",
        apeMaterno: "",
        nombre: "",
        fechaNacimiento: "",
        domicilioActual: "aea",
        distrito: "",
        ubigeo: "",
        nTelefono:"",
        nTelefFijo: "",
        nTelefCelular: "",
        tipoTelefono:"",
        arrayTelefonos:[],
        nombreCorreo:"",
        tipoCorreo:"",
        arrayCorreos:[],
        correoPersonal: "",
        correoLaboral: "",
        arrayDistritosLima: [],
        arrayTiposTelefono:[],
        estadoDomicilio: false
      });

    this.onSubmitDatosPersonales = this.onSubmitDatosPersonales.bind(this);
    console.log(2);
  }

  //RENDERIZADO INFINITO
  componentDidMount() {
    fetch(CONFIG + "mse/alumno/buscar/" + this.state.codigo)
      .then(response => {
        return response.json();
      })
      .then(alumno => {
        console.log(
          "---Alumno------Alumno------Alumno------Alumno------Alumno------Alumno---"
        );
        console.log(alumno);
        this.setState({
          id: this.state.id,
          apePaterno: alumno.apellidoPaterno,
          apeMaterno: alumno.apellidoMaterno,
          nombre: alumno.nombre,
          fechaNacimiento: alumno.fechaNacimiento,
          // domicilioActual: alumno.domicilioActual,
          distrito: alumno.distrito,
          ubigeo: alumno.ubigeo,
          nTelefFijo: alumno.telefonoFijo,
          nTelefCelular: alumno.telefonoCelular,
          correoPersonal: alumno.correoPersonal,
          correoLaboral: alumno.correoLaboral
        });
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });

    fetch(CONFIG + "mse/domicilio/buscar/" + this.state.id)
      .then(response => {
        return response.json();
      })
      .then(alumnoDomicilio => {
        console.log("---AlumnoDomicilio---");
        console.log(alumnoDomicilio);

        this.setState({
          domicilioActual: alumnoDomicilio.domicilio,
          ubigeo: alumnoDomicilio.ubigeo.trim(),
          estadoDomicilio: true
        });
      })
      .catch(error => {
        swal("Falta registrar su domicilio", " ", "warning");
        console.log(error);
      });

  
      fetch(CONFIG + "mse/telefono/tipotelefono/")
      .then(response => {
        return response.json();
      })
      .then(tipoTelefono => {
        console.log(
          "---TipoTelefono------TipoTelefono------TipoTelefono--- ---TipoTelefono------TipoTelefono------TipoTelefono-- ---TipoTelefono------TipoTelefono------TipoTelefono-- ---TipoTelefono------TipoTelefono------TipoTelefono--"
        );
        console.log(tipoTelefono);
        this.setState({
          arrayTiposTelefono:tipoTelefono
        })
      
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });


  }

  setField(e) {
    console.log(e.target.name);
    console.log(e.target.value);

    this.setState({ [e.target.name]: e.target.value });
  }
  agregarTelefono=(e) =>{
    e.preventDefault();
    console.log(this.state.tipoTelefono);
    console.log(this.state.nTelefono);
    let nuevoTelefono={
      tipo:this.state.tipoTelefono,
      numero:this.state.nTelefono
    }
    // console.log(nuevoTelefono);
    
     const arrayTelefonos= [...this.state.arrayTelefonos,nuevoTelefono];
     console.log("El arreglo de telefonos es:",arrayTelefonos);
     
    // const arrayTelefonos=this.state.arrayTelefonos.push(nuevoTelefono);
    console.log(1);
    
    this.setState({
      arrayTelefonos:arrayTelefonos
    })
    
    console.log(2);
    console.log(this.state.arrayTelefonos);
    console.log(3);
    
    this.onSubmitGuardarTelefono(e);

  }
  agregarCorreo=(e)=>{
    e.preventDefault();
    console.log(this.state.nombreCorreo);
    console.log(this.state.tipoCorreo);
    let nuevoCorreo={
      tipo:this.state.tipoCorreo,
      nombre:this.state.nombreCorreo
    }
    // console.log(nuevoTelefono);
    
     const arrayCorreos= [...this.state.arrayCorreos,nuevoCorreo];
     console.log("El arreglo de correos es:",arrayCorreos);
     
    // const arrayTelefonos=this.state.arrayTelefonos.push(nuevoTelefono);
    console.log(1);
    
    this.setState({
      arrayCorreos
    })
    
  

  }

  render() {
    let distritosLima = this.state.arrayDistritosLima;
    let contenido;
    let arrayTelefonos=this.state.arrayTelefonos;
    let arrayCorreos=this.state.arrayCorreos;
    let arrayTiposTelefono=this.state.arrayTiposTelefono;

    if (distritosLima) {
      console.log(
        "Se cargaron correctamente los distritos de lima ",
        distritosLima
      );

      contenido = (
        <div className="contenedor">
          <div className="">
            <h2 className="titulo">Datos Personales</h2>

            <div className="input-dato">
              {/* <div className="card card-primary">
                <div className="container bg-white">
                  <label className="label-dato">
                    N° DE DOCUMENTO DE IDENTIDAD (DNI O CARNE DE EXTRANJERÍA):
                    <input
                      type="text"
                      name="name"
                      value={this.state.codigo}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    APELLIDO PATERNO:
                    <input
                      type="text"
                      name="name"
                      value={this.state.apePaterno}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    APELLIDO MATERNO:
                    <input
                      type="text"
                      name="name"
                      value={this.state.apeMaterno}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    NOMBRES:
                    <input
                      type="text"
                      name="name"
                      value={this.state.nombre}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    FECHA DE NACIMIENTO:
                    <input
                      type="date"
                      name="name"
                      value={this.state.fechaNacimiento}
                      disabled
                    />
                  </label>
                </div>
              </div>

               */}
              <div className="container card card-primary bg-white ">
                <div className="container bg-light">
                  <button type="button" onClick={this.cambioEstadoCampo}>
                    <i className="fa fa-edit fa-2x"></i>
                  </button>
                    
                  
                </div>
                {/* 
                <label className="label-dato">
                  DOMICILIO ACTUAL:
                  <input
                    type="text"
                    name="domicilioActual"
                    value={this.state.domicilioActual}
                    id="domicilioActual"
                    onChange={e => this.setField(e)}
                    required
                    disabled
                  />
                </label>
                <label className="label-dato">
                  DISTRITO:
                  <div className="form-group">
                    <select
                      className="form-control"
                      name="ubigeo"
                      value={this.state.ubigeo}
                      id="ubigeo"
                      onChange={e => this.setField(e)}
                      disabled
                    >
                      <option>--Seleccione una opcion--</option>
                      {Object.keys(distritosLima).map(distrito => (
                        <Distritos
                          key={distrito}
                          id={distritosLima[distrito].id}
                          distrito={distritosLima[distrito].nombre}
                        />
                      ))}
                    </select>
                  </div>
                </label>
                <br></br>
                <br></br> */}

                <label className="label-dato col-md-8">Telefono</label>
                <div className="container bg-white">
                  <div className="form-group">
                    <div className="row">
                      <div className="col col-md-2 pt-2">
                        <select className="form-control" name="tipoTelefono" value={this.state.tipoTelefono} id="tipoTelefono" onChange={e => this.setField(e)} disabled>
                          <option value="DEFAULT">--Escoja una opcion--</option>
                          {Object.keys(arrayTiposTelefono).map(telefono=>(
                            <TiposTelefono 
                            key={telefono}
                            id={arrayTiposTelefono[telefono].idTipoTelefono}
                            tipotelefono_desc={arrayTiposTelefono[telefono].tipoTelefono}
                            
                            />
                          ))}
                        </select>

                      </div>
                      

                      <div className="col col-md-8">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="nTelefono"
                            id="numeroTelefono"
                            aria-describedby="helpId"
                            placeholder="Inserte Numero"
                            onChange={e => this.setField(e)}
                           disabled/>
                        </div>
                      </div>
                      <div className="col col-md-2">
                        
                        <button className="bg-white" id="btnTelefono" onClick={this.agregarTelefono}>
                          <i className="fa fa-plus-circle fa-3x"></i>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container bg-white"> 
                        <div className="row">
                          <div className="col col-md-12">
                            <table>
                              <thead>
                                  <tr>
                                    <th>Tipo</th>
                                    <th>Numero</th>
                                    <th>Accion</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {Object.keys(arrayTelefonos).map(telefono=>(
                                  <Telefono 
                                  key={telefono}
                                  tipo={arrayTelefonos[telefono].tipo}
                                  numero={arrayTelefonos[telefono].numero}
                                  />
                              ))}
                              </tbody>

                              </table>
                          </div>

                        </div>
                </div>

                

              

                 

                <label className="label-dato col-md-8">
                  Correo Electronico
                </label>
                <div className="container bg-white">
                  <div className="form-group">
                    <div className="row">
                      <div className="col col-md-2 pt-2">
                        <select className="form-control" id="tipoCorreo" name="tipoCorreo" value={this.state.tipoCorreo} id="tipoCorreo" onChange={e => this.setField(e)} disabled>
                          <option value="DEFAULT">--Escoja una opcion--</option>
                          <option value="personal" >Personal</option>
                          <option value="laboral"> Laboral</option>
                        </select>
                      </div>
                      <div className="col col-md-8">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="nombreCorreo"
                            id="nombreCorreo"
                            aria-describedby="helpId"
                            placeholder="Inserte correo"
                            onChange={e => this.setField(e)}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col col-md-2">
                        <button className="bg-white" onClick={this.agregarCorreo}>
                          <i className="fa fa-plus-circle fa-3x"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

               

                <div className="container bg-white"> 
                        <div className="row">
                          <div className="col col-md-12">
                            <table>
                              <thead>
                                  <tr>
                                    <th>Tipo</th>
                                    <th>Correo</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {Object.keys(arrayCorreos).map(correo=>(
                                  <Correo 
                                  key={correo}
                                  tipo={arrayCorreos[correo].tipo}
                                  nombre={arrayCorreos[correo].nombre}
                                  />
                              ))}
                              </tbody>

                              </table>
                          </div>

                        </div>
                </div>



               
              </div>

              <div className="row">
                <div className="col col-md-6 col-lg-12 ">
                  <div className="text-right">
                    <input
                      type="submit"
                      value="Enviar"
                      className="btn btn-success right"
                      onClick={this.onSubmitDatosPersonales}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      contenido = <h1>Espere un momento porfavor</h1>;
    }
    return contenido;
  }

  componentWillMount() {
    let urlApi =
      "https://raw.githubusercontent.com/ernestorivero/Ubigeo-Peru/master/json/ubigeo_peru_2016_distritos.json";
    fetch(urlApi)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(respuesta2 => {
        console.log(typeof respuesta2);
        console.log("ESTOY AQUI ESTOY AQUI ESTOY AQUI ESTOY AQUI ESTOY AQUI ESTOY AQUI ESTOY AQUI ESTOY AQUIESTOY AQUI");
        
        console.log(respuesta2);
        
        let distritosLima = this.buscarLima(respuesta2);

        if (distritosLima === null) {
          console.log("No hay ningun distrito");
          console.log(distritosLima);
        } else {
          console.log("Tenemos los distritos de lima");
          this.setState({
            arrayDistritosLima: distritosLima
          });
        }
      });
      console.log("Hola estoy aqui :'v :'v :'v :'v :'v :'v:'v :'v :'v:'v :'v :'v");
      
     

  }

  //Deshabilitar y habilitar campos
  cambioEstadoCampo = e => {
    e.preventDefault();
    console.log("Evaluaremos el estado");
    // let domicilioActual = document.getElementById("domicilioActual");
    // let ubigeo = document.getElementById("ubigeo");
    let tipoTelefono = document.getElementById("tipoTelefono");
    let numeroTelefono = document.getElementById("numeroTelefono");
    let btnTelefono = document.getElementById("btnTelefono");
    let tipoCorreo = document.getElementById("tipoCorreo");
    let nombreCorreo = document.getElementById("nombreCorreo");
   

    // domicilioActual.disabled = !domicilioActual.disabled;
    // ubigeo.disabled = !ubigeo.disabled;
    tipoTelefono.disabled=!tipoTelefono.disabled;
    numeroTelefono.disabled=!numeroTelefono.disabled;
    tipoCorreo.disabled=!tipoCorreo.disabled;
    nombreCorreo.disabled=!nombreCorreo.disabled

  };

  //Metodo para guardar o editar el domicilio de una persona
  onSubmitGeneral = e => {
    e.preventDefault();
    if (this.state.estadoDomicilio) {
      console.log("Se va a editar el domicilio de una persona");

      this.onSubmitEditarDomicilio(e);
    } else {
      console.log("Se va a Guardar el domicilio de una persona");
      this.onSubmitGuardarDomicilioPersona(e);
    }
  };

//Metodo para guardar el telefono
  onSubmitGuardarTelefono = e =>{
    e.preventDefault();
    console.log("--ENVIAREMOS LOS DATOS DEL TELEFONO");
    console.log(
    JSON.stringify({
      idPersona: 24,
      idTipoTelefono:this.state.tipoTelefono,
      numeroTelefonico:this.state.nTelefono

    })
    )

    fetch(CONFIG + "mse/telefono/guardar/", {
      method: "POST",
      body: JSON.stringify({
        idPersona: "24" ,
        idTipoTelefono: this.state.tipoTelefono,
        numeroTelefonico: this.state.nTelefono
  
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      } 
    })
      .then(response => {
        swal("Guardado Correctamente", "", "success");
        return response.json();
      })
      .then(alumno => {
        console.log("---RESPUESTA---");
        console.log(alumno);
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });
  }

  //Metodo para guardar el domicilio de una persona
  onSubmitGuardarDomicilioPersona = e => {
    e.preventDefault();
    console.log("---DATOS A ENVIAR---");
    console.log(
      JSON.stringify({
        id: this.state.id,
        domicilio: this.state.domicilioActual,
        ubigeo: this.state.ubigeo
      })
    );
    fetch(CONFIG + "mse/domicilio/guardar/", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id,
        domicilio: this.state.domicilioActual,
        ubigeo: this.state.ubigeo
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        swal("Guardado Correctamente", "", "success");
        return response.json();
      })
      .then(alumno => {
        console.log("---RESPUESTA---");
        console.log(alumno);
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });
  };

  //Metodo para editar el Domicilio
  onSubmitEditarDomicilio = e => {
    e.preventDefault();
    fetch(CONFIG + "mse/domicilio/editar/", {
      method: "PUT",
      body: JSON.stringify({
        id: this.state.id,
        domicilio: this.state.domicilioActual,
        ubigeo: this.state.ubigeo
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        swal("Actualizado Correctamente", "", "success");
        return response.json();
      })
      .then(alumno => {
        console.log("---RESPUESTA---");
        console.log(alumno);
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });
  };

  //Metodo para actualizar los datos personales de un alumno
  onSubmitDatosPersonales = e => {
    e.preventDefault();
    console.log("---ENVIA---");
    console.log(
      JSON.stringify({
        codigoAlumno: this.state.codigo,
        dni: this.state.dni,
        apellidoPaterno: this.state.apePaterno,
        apellidoMaterno: this.state.apeMaterno,
        nombre: this.state.nombre,
        fechaNacimiento: this.state.fechaNacimiento,
        domicilioActual: this.state.domicilioActual,
        distrito: this.state.distrito,
        ubigeo: this.state.ubigeo,
        telefonoFijo: this.state.nTelefFijo,
        telefonoCelular: this.state.nTelefCelular,
        correoPersonal: this.state.correoPersonal,
        correoLaboral: this.state.correoLaboral
      })
    );

    fetch(CONFIG + "mse/alumno/actualizar/", {
      method: "PUT",
      body: JSON.stringify({
        codigoAlumno: this.state.codigo,
        dni: this.state.dni,
        apellidoPaterno: this.state.apePaterno,
        apellidoMaterno: this.state.apeMaterno,
        nombre: this.state.nombre,
        fechaNacimiento: this.state.fechaNacimiento,
        domicilioActual: this.state.domicilioActual,
        distrito: this.state.distrito,
        ubigeo: this.state.ubigeo,
        telefonoFijo: this.state.nTelefFijo,
        telefonoCelular: this.state.nTelefCelular,
        correoPersonal: this.state.correoPersonal,
        correoLaboral: this.state.correoLaboral
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        swal("Actualizado Correctamente", "", "success");
        return response.json();
      })
      .then(alumno => {
        console.log("---RESPUESTA---");
        console.log(alumno);
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });

    //Envior los datos del domicilio y ubigeo
    this.onSubmitGeneral(e);
  };

  //Metodo para buscar a lima desde la API
  buscarLima(valor) {
    let arrayDistritos = [];
    for (let distrito of valor) {
      if (distrito.province_id === "1501") {
        let distritoObjeto = {
          id: distrito.id,
          nombre: distrito.name
        };
        arrayDistritos.push(distritoObjeto);
      }
    }
    return arrayDistritos;
  }
}

export default VistaDatosPersonales;
