import React from 'react';
import { Link } from "react-router-dom";  //Para evitar la recarga al entrar en enlace

class Listar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { datosCargados:false, arrEmpleados:[] }
    cargarDatos(){
        fetch('http://jsonplaceholder.typicode.com/users')
        // fetch('https://api.dailymotion.com/users')
        // fetch('https://api.dailymotion.com/videos?channel=sport&limit=10')
        .then( respuesta => respuesta.json() )
        .then( (datos) => {
            console.log(datos)
            this.setState( {datosCargados:true, arrEmpleados: datos})
        })
        .catch(console.error)
    }
    componentDidMount(){
        this.cargarDatos();
    }
    render() { 
        const{datosCargados, arrEmpleados} = this.state

        if(!datosCargados){
            return(<div>Cargando Datos...</div>)
        }
        else{
            return ( <table className="table">
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
                                    <td>{empleado.name}</td>
                                    <td>{empleado.email}</td>
                                    <td><div className="btn-group" role="group" aria-label="">
                                        <Link type="button" className="btn btn-warning" to={'/edit'}>Editar</Link>
                                        <button type="button" className="btn btn-danger">Borrar</button>
                                    </div></td>
                                </tr>
                            )
                        )
                    }

                    

                </tbody>
            </table> );
        }
        
    }
}
 
export default Listar;