import React, { Component } from 'react';

class Telefono extends Component{

    


    render(){
        let numero=this.props.numero;
        let tipo=this.props.tipo;
        return(
            <tr> 
                <td>{tipo}</td>
                <td>{numero}</td>
                <td>
                <button type="button" className="bg-white">
                    <i className="far fa-trash-alt fa-2x"></i>
                  </button>  
                </td>
            </tr>
        )
    }
}
export default Telefono;