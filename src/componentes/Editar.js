import React from 'react';
import { Link } from "react-router-dom"; 

import Api from '../servicios/api';

class Editar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { datosCargados:false, empleado:[] }

    componentDidMount(){
        console.log(this.props.match.params.id);

        // fetch('http://localhost/demo/empleados/?consultar='+this.props.match.params.id)
        fetch(Api+'?consultar='+this.props.match.params.id)
        .then( respuesta => respuesta.json() )
        .then( (datos) => {
            console.log(datos)
            this.setState( {datosCargados:true, empleado: datos[0]})
        })
        .catch(console.error)
    }

    cambioValor = (e) => {
        const state=this.state.empleado;
        state[e.target.name]=e.target.value;
        this.setState({ empleado:state })
    }

    enviaDatos = (e) => {
        e.preventDefault();
        console.log('Enviando formulario ...');

        const{id, nombre, correo}= this.state.empleado;
        console.log(id);
        console.log(nombre);
        console.log(correo);
        

        var datosEnvio= {id:id, nombre:nombre, correo:correo }

        //fetch('http://localhost/demo/empleados/?actualizar=1', {
        fetch(Api+'?actualizar=1', {
            method:'POST',
            body:JSON.stringify(datosEnvio)
        })
        .then( respuesta => respuesta.json() )
        .then( (datos) => {
            console.log(datos);
            this.props.history.push("/");   //Redirige a Home
        })
        .catch(console.error)
    }
    
    render() { 
        const{datosCargados, empleado} = this.state;

        if(!datosCargados){
            return(<div>Cargando Empleado...</div>)
        }
        else{
            return ( <div className="card">
                <div className="card-header">
                    Actualizar Empleado
                </div>
                <div className="card-body">
                    <form onSubmit={this.enviaDatos}>

                        

                        <div className="form-group">
                          <label htmlFor="id">Clave</label>
                          <input required type="text" className="form-control" readOnly value={empleado.id} name="id" id="id" aria-describedby="helpId" placeholder=""/>
                          <small id="helpId" className="form-text text-muted">Help text</small>
                        </div>

                        <div className="form-group">
                        <label htmlFor="nombre">Nombre :</label>
                        <input required type="text" name="nombre" value={empleado.nombre} onChange={this.cambioValor} id="nombre" className="form-control" placeholder="" aria-describedby="helpId"/>
                        <small id="helpId" className="text-muted">Escriba el nombre de empleado</small>
                        </div>

                        <div className="form-group">
                        <label htmlFor="email">Correo: </label>
                        <input type="email" name="correo" value={empleado.correo} onChange={this.cambioValor} id="email" className="form-control" placeholder="" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Escriba el Correo de empleado</small>
                        </div>

                        <div className="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-warning">Actualizar</button>
                            <Link type="button" className="btn btn-secondary" to={'/'}>Cancelar</Link>
                        </div>

                    </form>
                </div>
                <div className="card-footer text-muted">
                    Footer
                </div>
            </div> );
        }
    }
}
 
export default Editar;