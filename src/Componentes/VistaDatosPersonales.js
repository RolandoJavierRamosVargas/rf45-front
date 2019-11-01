import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { browserHistory } from "react-router-3";
import CONFIG from "../Configuracion/Config";
import swal from "sweetalert";
import Swal from 'sweetalert2';
import Select from "react-select";
import { KeyObject } from "crypto";
import Distritos from "./Distritos";
import Telefono from "./Telefono";
import Correo from "./Correo";
import TiposTelefono from "./TiposTelefono";
import TiposCorreo from "./TiposCorreo";

class VistaDatosPersonales extends React.Component {
  constructor(props) {
    super(props);

    
      this.state = {
        codigo: this.props.codigo,
        dni: this.props.dni,
        id: 23,
        apePaterno: "",
        apeMaterno: "",
        nombre: "",
        fechaNacimiento: "",
        domicilioActual: "",
        distrito: "",
        ubigeo: "",
        nTelefono:"",
        nTelefFijo: "",
        nTelefCelular: "",
        tipoTelefono:"",
        nombreCorreo:"",
        tipoCorreo:"",
        arrayCorreos:[],
        correoPersonal: "",
        correoLaboral: "",
        arrayDistritosLima: [],
        arrayTiposTelefono:[],
        arrayTelefonos:[],
        arrayTiposCorreo:[],
        estadoDomicilio: false
      };

    this.onSubmitDatosPersonales = this.onSubmitDatosPersonales.bind(this);
  }

  //RENDERIZADO INFINITO
  componentDidMount() {
    fetch(CONFIG + "mse/persona/buscar/" + this.state.codigo)
      .then(response => {
        return response.json();
      })
      .then(persona => {
        console.log(
          "---persona------persona------persona------persona------persona------persona---"
        );
        console.log(persona);
        this.setState({
          id:persona.id,
          apePaterno: persona.apellidoPaterno,
          apeMaterno: persona.apellidoMaterno,
          nombre: persona.nombres,
          fechaNacimiento: persona.fechaNacimiento,
          // domicilioActual: persona.domicilioActual,
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



      fetch(CONFIG + "mse/correo/tipoCorreo/")
      .then(response => {
        return response.json();
      })
      .then(tipoCorreo => {
        console.log(
          "---tipoCorreo------tipoCorreo------tipoCorreo--- ---tipoCorreo------tipoCorreo----"
        );
        console.log(tipoCorreo);
        this.setState({
          arrayTiposCorreo:tipoCorreo
        })
      
      })
      .catch(error => {
        swal("Algo salió mal", "", "warning");
        console.log(error);
      });



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
      fetch(CONFIG+"mse/telefono/telefonos/"+this.state.id)
      .then(respuesta=>{
        return respuesta.json();
      })
      .then(telefonos=>{
        console.log("Estamos aqui para qe nos veas--- X) X) X) X) Estamos aqui para qe nos veas--- X) X) X) X)");
        console.log(telefonos);
        this.setState({
          arrayTelefonos:telefonos
        })
      })

      console.log("Hola estoy aqui :'v :'v :'v :'v :'v :'v:'v :'v :'v:'v :'v :'v");
      fetch(CONFIG+"mse/correo/correos/"+this.state.id)
      .then(respuesta=>{
        return respuesta.json();
      })
      .then(correos=>{
        console.log("Estamos aqui para qe nos veas---CORREOSSSSSSSSS");
        console.log(correos);
        this.setState({
          arrayCorreos:correos
        })
      })
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
      idPersona:this.state.id,
      idTipoTelefono:this.state.tipoTelefono,
      numeroTelefonico:this.state.nTelefono
    }
    // console.log(nuevoTelefono);
     const arrayTelefonos= [...this.state.arrayTelefonos,nuevoTelefono];
     console.log("El arreglo de telefonos es:",arrayTelefonos);
     // const arrayTelefonos=this.state.arrayTelefonos.push(nuevoTelefono);
    this.setState({
      arrayTelefonos:arrayTelefonos
    })
    console.log(this.state.arrayTelefonos);
    this.onSubmitGuardarTelefono(e);

  }
  borrarTelefono = numeroTelefono =>{


    console.log(numeroTelefono);
    
    //leer el state
    const telefonosActuales= [...this.state.arrayTelefonos];
    console.log("Antes...");
    console.log(telefonosActuales);
    

    //borrar el elemento del state
    const arrayTelefonos= telefonosActuales.filter(telefono=>telefono.numeroTelefonico!== numeroTelefono);
    console.log("Despues...");
    console.log(arrayTelefonos);
    

    //actualizar el state
    this.setState({
      arrayTelefonos
    })

    fetch(CONFIG + "mse/telefono/eliminar/"+numeroTelefono,{
      method: "DELETE",
      body: JSON.stringify({
          id: numeroTelefono
      }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      swal("Eliminado correctamente", "", "success");
      
    })
} 



  agregarCorreo=(e)=>{
    e.preventDefault();
    console.log(this.state.nombreCorreo);
    console.log(this.state.tipoCorreo);
    let nuevoCorreo={
      id:this.state.id,
      idTipoCorreo:this.state.tipoCorreo,
      correo:this.state.nombreCorreo
    }
    // console.log(nuevoTelefono);
    
     const arrayCorreos= [...this.state.arrayCorreos,nuevoCorreo];
     console.log("El arreglo de correos es:",arrayCorreos);
     
    // const arrayTelefonos=this.state.arrayTelefonos.push(nuevoTelefono);
    console.log(1);
    
    this.setState({
      arrayCorreos
    })
    this.onSubmitGuardarCorreo(e);
  }

    borrarCorreo = correoBorrar =>{


    console.log("El correo a borarr es : -> El correo a borarr es : -> El correo a borarr es : ->",correoBorrar);
    
    //leer el state
    const correosActuales= [...this.state.arrayCorreos];
    console.log("Antes...");
    console.log(correosActuales);
    

    //borrar el elemento del state
    const arrayCorreos= correosActuales.filter(correo=>correo.correo!== correoBorrar);
    console.log("Despues...");
    console.log(arrayCorreos);
    

    //actualizar el state
    this.setState({
      arrayCorreos
    })


    fetch(CONFIG + "mse/correo/eliminar/",{
      method: "DELETE",
      body: JSON.stringify({
          correo: correoBorrar
      }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      swal("Eliminado correctamente", "", "success");
    })

} 


  render() {
    let distritosLima = this.state.arrayDistritosLima;
    let contenido;
    let arrayTelefonos=this.state.arrayTelefonos;
    let arrayCorreos=this.state.arrayCorreos;
    let arrayTiposTelefono=this.state.arrayTiposTelefono;
    let arrayTiposCorreo=this.state.arrayTiposCorreo;

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
               <div className="card card-primary">
                <div className="container bg-white">
                  <label className="label-dato">
                    N° DE DOCUMENTO DE IDENTIDAD (DNI O CARNE DE EXTRANJERÍA):
                    <input
                      type="text"
                      name="codigo"
                      value={this.state.codigo}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    APELLIDO PATERNO:
                    <input
                      type="text"
                      name="apePaterno"
                      value={this.state.apePaterno}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    APELLIDO MATERNO:
                    <input
                      type="text"
                      name="apeMaterno"
                      value={this.state.apeMaterno}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    NOMBRES:
                    <input
                      type="text"
                      name="nombre"
                      value={this.state.nombre}
                      disabled
                    />
                  </label>
                  <label className="label-dato">
                    FECHA DE NACIMIENTO:
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={this.state.fechaNacimiento}
                      disabled
                    />
                  </label>
                </div>
              </div>

               
              <div className="container bg-white card card-primary ">
                <div className="bg-light">
                  <button type="button" onClick={this.cambioEstadoCampo}>
                    <i className="fa fa-edit fa-2x"></i>
                  </button>            
                </div>
                 
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
                

                <label className="label-dato">TELEFONO</label>
                <div className="ml-3 mr-3">
                  <div className="form-group">
                    <div className="row">
                      <div className="col col-md-3">
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
                      <div className="col col-md-7">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control text-center"
                            name="nTelefono"
                            id="numeroTelefono"
                            aria-describedby="helpId"
                            placeholder="Inserte Numero"
                            onChange={e => this.setField(e)}
                           disabled/>
                        </div>
                      </div>
                      <div className="col col-md-2 text-center">
                        
                        <button className="bg-white" id="btnTelefono" onClick={this.agregarTelefono}>
                          <i className="fa fa-plus-circle fa-3x"></i>
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
                

                <div className="ml-3 mr-3"> 
                        
                            <table className="table">
                              <thead className="thead thead-dark">
                                  <tr>
                                    <th className="th1">Tipo</th>
                                    <th className="th1">Numero</th>
                                    <th className="th1">Accion</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {Object.keys(arrayTelefonos).map(telefono=>(
                                  <Telefono 
                                  key={telefono}
                                  tipo={arrayTelefonos[telefono].idTipoTelefono}
                                  numero={arrayTelefonos[telefono].numeroTelefonico}
                                  borrarTelefono={this.borrarTelefono}
                                  />
                              ))}
                              </tbody>
                              </table>
                          
                </div>



                
                <label className="label-dato">CORREO ELECTRONICO</label>
                <div className="ml-3 mr-3">
                  <div className="form-group">
                    <div className="row">
                      <div className="col col-md-3">
                        <select className="form-control" id="tipoCorreo" name="tipoCorreo" value={this.state.tipoCorreo} id="tipoCorreo" onChange={e => this.setField(e)} disabled>
                          <option value="DEFAULT">--Escoja una opcion--</option>
                          {Object.keys(arrayTiposCorreo).map(correo=>(
                            <TiposCorreo 
                            key={correo}
                            id={arrayTiposCorreo[correo].id}
                            correo={arrayTiposCorreo[correo].tipoCorreo}
                            />
                          ))}
                        </select>
                      </div>
                      <div className="col col-md-7">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control text-center"
                            name="nombreCorreo"
                            id="nombreCorreo"
                            aria-describedby="helpId"
                            placeholder="Inserte correo"
                            onChange={e => this.setField(e)}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col col-md-2 text-center">
                        <button className="bg-white" onClick={this.agregarCorreo}>
                          <i className="fa fa-plus-circle fa-3x"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ml-3 mr-3"> 
                            <table className="table">
                              <thead className="thead-dark">
                                  <tr>
                                    <th className="th1">Tipo</th>
                                    <th className="th1">Correo</th>
                                    <th className="th1">Accion</th>
                                  </tr>
                              </thead>
                              <tbody>
                              {Object.keys(arrayCorreos).map(correo=>(
                                  <Correo 
                                  key={correo}
                                  tipo={arrayCorreos[correo].idTipoCorreo}
                                  correo={arrayCorreos[correo].correo}
                                  borrarCorreo={this.borrarCorreo}
                                  />
                              ))}
                              </tbody>
                              </table>
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

 

  //Deshabilitar y habilitar campos
  cambioEstadoCampo = e => {
    e.preventDefault();
    console.log("Evaluaremos el estado");
    let domicilioActual = document.getElementById("domicilioActual");
    let ubigeo = document.getElementById("ubigeo");
    let tipoTelefono = document.getElementById("tipoTelefono");
    let numeroTelefono = document.getElementById("numeroTelefono");
    let btnTelefono = document.getElementById("btnTelefono");
    let tipoCorreo = document.getElementById("tipoCorreo");
    let nombreCorreo = document.getElementById("nombreCorreo");
   

    domicilioActual.disabled = !domicilioActual.disabled;
    ubigeo.disabled = !ubigeo.disabled;
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
      idPersona: this.state.id,
      idTipoTelefono:this.state.tipoTelefono,
      numeroTelefonico:this.state.nTelefono

    })
    )

    fetch(CONFIG + "mse/telefono/guardar/", {
      method: "POST",
      body: JSON.stringify({
        idPersona: this.state.id ,
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
      })
  }
  onSubmitGuardarCorreo=(e)=>{
    e.preventDefault();
    console.log("Enviaremos los datos del correo");
    console.log(
    JSON.stringify({
      id: this.state.id ,
      idTipoCorreo: this.state.tipoCorreo,
      correo: this.state.nombreCorreo

    })
    )

    fetch(CONFIG + "mse/correo/guardar/", {
      method: "POST",
      body: JSON.stringify({
        id: this.state.id ,
        idTipoCorreo: this.state.tipoCorreo,
        correo: this.state.nombreCorreo
  
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      } 
    })
      .then(response => {
        swal("Guardado Correctamente", "", "success");
      })
    
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

    //De momento este codigo no es utilizado para nada
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
