import './App.css';
import Listar from './componentes/Listar';
import Crear from "./componentes/Crear";
import Editar from "./componentes/Editar";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import { Link } from "react-router-dom";  //Para evitar la recarga al entrar en enlace

function App() {
  return (

    <Router>

      <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="nav navbar-nav">
              {/* <a className='nav-item nav-link active' href='/'>Home <span className='sr-only'>(current)</span></a>
              <a className='nav-item nav-link' href='/add'>Nuevo</a>
              <a className='nav-item nav-link' href='/edit'>Editar*</a> */}
              <Link className='nav-item nav-link active' to={'/'}>Home <span className='sr-only'>(current)</span></Link>
              <Link className='nav-item nav-link' to={'/add'}>Nuevo</Link>
              <Link className='nav-item nav-link' to={'/edit'}>Editar*</Link>
            </div>
      </nav>
      <br></br>
      <div className="container">
        <Route exact path='/' component={Listar}></Route>
        <Route path='/add' component={Crear}></Route>
        <Route path='/edit' component={Editar}></Route>

      </div>
    </Router>
  );
}

export default App;
