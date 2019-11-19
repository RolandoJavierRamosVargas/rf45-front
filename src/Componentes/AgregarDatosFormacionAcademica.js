import React ,{Component} from 'react';
import Paises from './Paises';

class AgregarDatosFormacionAcademica extends Component{

    gradoObtenido=React.createRef();
    nombreTitulo=React.createRef();
    centroEstudios=React.createRef();
    pais=React.createRef();
    facultad=React.createRef();
    fechaInicio=React.createRef();
    fechaFin=React.createRef();

    state={
        paises:[]
    };


    componentWillMount() {
    fetch("https://raw.githubusercontent.com/apilayer/restcountries/master/src/main/resources/countriesV1.json")
      .then(response => {
        return response.json();
      })
      .then(paises => {
        let arrayPaises=[];
        console.log("Esta es la lista de los paises",paises);
        paises.forEach(pais => {
            arrayPaises.push(pais.name);
        });
        console.log("El arreglo de paises es  ->>>>>>",arrayPaises);
        this.setState({
            paises:arrayPaises
        })
      })
      .catch(error => {
        
        console.error(error);
      }); 
    }
    render(){
        let paises=this.state.paises;
        return(
            <form onSubmit={this.formacionAcademica}>
            <div className="container bg-white text-primary">
                <div className="row">
                    <h1 className="w-100 text-center"> Formacion Academica</h1>
                    <hr/><br/><br/>
                    <div className="col col-md-6">
                        <div className="container bg-white mt-2">

                        <div className="form-group">
                          <div className="row">
                              <label className="col col-md-4">Grado obtenido</label> 
                              <select class="form-control col col-md-8" ref={this.gradoObtenido} name="" id="">
                                   <option>--Seleccione--</option>
                                   <option value="doctorado">Doctorado</option>
                                   <option value="magister">Magister</option>
                                   <option value="licenciado">Licenciado</option>
                                   <option value="bachiller">Bachiller</option>
                                   <option value="segunda_especialidad">Segunda Especialidad</option>
                               </select>
                           </div>  
                           
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Nombre Titulo</label> 
                                <input type="text" className="form-control col col-md-8" ref={this.nombreTitulo} placeholder="ingrese el nombre del titulo"/> 
                            </div>
                           
                        </div>
                        <div className="form-group">
                           <label className="col col-md-4">Centro de estudios</label> 
                           <input type="text" className="form-control col col-md-8" ref={this.centroEstudios} placeholder="ingrese el centro de estudios"/>
                        </div>
                            <br />
                            <br /><br />
                        
                           <div class="form-group">
                             <label className="col col-md-4">Pais</label>
                             <select className="form-control col col-md-8" ref={this.pais} name="" id="">
                               <option>--Seleccione--</option>
                               {Object.keys(paises).map(pais=>(
                                   <Paises
                                   key={pais}
                                   pais={paises[pais]}
                                   />
                                   
                               ))}

                             </select>
                           </div>

                        </div>
                    
                    </div>

                    <div className="col col-md-6">
                       <div className="container bg-white mt-2">
                       
                       <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Facultad</label> 
                                <input type="text" className="form-control col col-md-8" ref={this.facultad} placeholder="ingrese su facultad" />
                            </div>
                            
                        </div>           

                        <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Fecha de inicio</label> 
                                <input type="date" ref={this.fechaInicio} className="form-control col col-md-8" />
                            </div>
                            
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <label className="col col-md-4">Fecha de Fin</label> 
                                <input type="date" ref={this.fechaFin} className="form-control col col-md-8" />
                            </div>
                            
                        </div>      
                       </div> 
                        
                    </div>
                </div>

                <div className="container bg-white text-center">
                    <button type="submit" class="btn btn-primary mr-2">Aceptar</button>
                    <button onClick={this.cerrarVentana} type="button" class="btn btn-warning ml-2">Cancelar</button>

                </div>

            </div>
        </form>
        )
    }

    cerrarVentana=e=>{
        e.preventDefault();
        window.close();
    }

    formacionAcademica=e=>{
        e.preventDefault();
        console.log("Se ha disparado la funcionAcademica");
        
        let infoDatos={
            gradoObtenido:this.gradoObtenido.current.value,
            nombreTitulo:this.nombreTitulo.current.value,
            centroEstudios:this.centroEstudios.current.value,
            pais:this.pais.current.value,
            facultad:this.facultad.current.value,
            fechaInicio:this.fechaInicio.current.value,
            fechaFin:this.fechaFin.current.value    
        }
        console.log(infoDatos);
        

        
    }
}
export default AgregarDatosFormacionAcademica;
