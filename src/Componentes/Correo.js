import React, { Component } from 'react';

class Correo extends Component{

    


    render(){
        let nombre=this.props.nombre;
        let tipo=this.props.tipo;
        return(
            <tr> 
                <td>{tipo}</td>
                <td>{nombre}</td>
            </tr>
        )
    }
}
export default Correo;