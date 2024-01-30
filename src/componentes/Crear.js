import React from 'react';
import { Link } from "react-router-dom";

import Api from '../servicios/api';

class Crear extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { nombre:'', correo:'@mail.com'
        , errores:[]
    }

    cambioValor = (e) => {
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({ state, errores:[] });
    }

    indicaError(elemento){
        return this.state.errores.indexOf(elemento) !==-1;
    }

    enviaDatos = (e) => {
        e.preventDefault();
        console.log('Enviando formulario ...');

        const{nombre, correo}= this.state;
        console.log(nombre);
        console.log(correo);
        
        //Validaciones:
        var errores=[];
        if(!nombre) errores.push('error_nombre');
        if(!correo) errores.push('error_correo');
        this.setState({errores:errores})
        if(errores.length>0) return false;
        //  <<<

        var datosEnvio= {nombre:nombre, correo:correo }

        //fetch('http://localhost/demo/empleados/?insertar=1', {
        fetch(Api+'?insertar=1', {
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

        const{nombre, correo}= this.state;
        

        return ( <div className="card">
            <div className="card-header">
                Nuevo Empleado
            </div>
            <div className="card-body">
                <form onSubmit={this.enviaDatos}>

                    <div className="form-group">
                      <label htmlFor="nombre">Nombre :</label>
                      <input type="text" name="nombre" value={nombre} onChange={this.cambioValor} id="nombre" 
                        className={ ((this.indicaError('error_nombre'))?"is-invalid ":" ")+ "form-control"} placeholder="" aria-describedby="helpId"/>
                      <small id="helpId" className="invalid-feedback">Escriba el nombre de empleado</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Correo: </label>
                      <input type="email" name="correo" value={correo} onChange={this.cambioValor} id="email" 
                        className={ ((this.indicaError('error_correo'))?"is-invalid ":" ")+ "form-control"} placeholder="" aria-describedby="helpId" />
                      <small id="helpId" className="invalid-feedback">Escriba el Correo de empleado</small>
                    </div>

                    <div className="btn-group" role="group" aria-label="">
                        <button type="submit" className="btn btn-success">Agregar</button>
                        <Link type="button" className="btn btn-primary" to={'/'}>Cancelar</Link>
                    </div>

                </form>
            </div>
            <div className="card-footer text-muted"></div>
        </div>  );
    }
}
 
export default Crear;