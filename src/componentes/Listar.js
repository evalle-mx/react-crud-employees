import React from 'react';
import { Link } from "react-router-dom";  //Para evitar la recarga al entrar en enlace

class Listar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { datosCargados:false, arrEmpleados:[] }
    cargarDatos(){
        // fetch('http://jsonplaceholder.typicode.com/users')
        // fetch('https://api.dailymotion.com/users')
        // fetch('https://api.dailymotion.com/videos?channel=sport&limit=10')
        fetch('http://localhost/demo/empleados/')
        .then( respuesta => respuesta.json() )
        .then( (datos) => {
            console.log(datos)
            this.setState( {datosCargados:true, arrEmpleados: datos})
        })
        .catch(console.error)
    }

    borrarRegistro = (id) => {
        console.log(`Borrando ${id}...`);

        fetch('http://localhost/demo/empleados/?borrar='+id)
        .then( respuesta => respuesta.json() )
        .then( (datos) => {
            console.log(datos);
            this.cargarDatos();
            console.log('Deleted '+datos);
        })
        .catch(console.error)
    }


    componentDidMount(){
        this.cargarDatos();
    }
    render() { 
        const{datosCargados, arrEmpleados} = this.state;

        if(!datosCargados){
            return(<div>Cargando Datos...</div>)
        }
        else{
            return ( 
            <div className="card">
                <div className="card-header">
                <Link type="button" className="btn btn-success" to={'/add'}>Agregar nuevo empleado</Link>
                </div>
                <div className="card-body">
                    <h4>Lista de empleados</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arrEmpleados.map(
                                    (empleado) => (
                                        <tr key={empleado.id}>
                                            <td>{empleado.id}</td>
                                            <td>{empleado.nombre}</td>
                                            <td>{empleado.correo}</td>
                                            <td><div className="btn-group" role="group" aria-label="">
                                                <Link type="button" className="btn btn-warning" 
                                                to={'/edit/'+empleado.id}

                                                > Editar</Link>

                                                <button type="button" className="btn btn-danger" 
                                                    onClick={()=>this.borrarRegistro(empleado.id)}>Borrar</button>
                                            </div></td>
                                        </tr>
                                    )
                                )
                            }

                            

                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-muted">
                    
                </div>
            </div>
             );
        }
        
    }
}
 
export default Listar;