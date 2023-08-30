import { Navbar, Container } from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import './navbar.scss'

export const NavModel = ()=> {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="space-between">
          <div>
            {/* <a href="/"><img src="logo.png" alt="logo" /></a>   */}
          </div>
          <div>
            <NavLink className={({isActive})=>(isActive ? "active" : "navLink")} to="/">Inicio</NavLink>
            <NavLink className={({isActive})=>(isActive ? "active" : "navLink")} to="/productos">Productos</NavLink>      
            <NavLink className={({isActive})=>(isActive ? "active" : "navLink")} to="/mi-perfil">Mi Perfil</NavLink>      
            <NavLink className={({isActive})=>(isActive ? "active" : "navLink")} to="/carrito">Carrito</NavLink>      
            <NavLink className={({isActive})=>(isActive ? "active" : "navLink")} to="/iniciar-sesion">Iniciar sesión</NavLink>      
          </div>
        </Container>
      </Navbar>
    </>
  );
}