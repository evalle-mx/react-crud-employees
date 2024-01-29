import React from 'react';
import { Link } from "react-router-dom";  //Para evitar la recarga al entrar en enlace

class Listar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
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
                <tr>
                    <td scope="row">1</td>
                    <td>Oscar</td>
                    <td>mai@mail.com</td>
                    <td><div className="btn-group" role="group" aria-label="">
                        <Link type="button" className="btn btn-warning" to={'/edit'}>Editar</Link>
                        <button type="button" className="btn btn-danger">Borrar</button>
                    </div></td>
                </tr>
            </tbody>
        </table> );
    }
}
 
export default Listar;