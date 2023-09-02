import { Navbar, Container } from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import './navbar.scss'
import { useMarketplace } from "../../context";
import RegisterModal from "../modal/RegisterModal";

export const NavModel = ()=> {
  const { showModal , setShowModal } = useMarketplace(); 

console.log(showModal);

const handleChangeModal= ()=>{
  setShowModal(!showModal);
}
  
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
            <button className={({isActive})=>(isActive ? "active" : "navLink")} onClick={handleChangeModal}>Iniciar sesión</button>      
          </div>
            {showModal ? null : <RegisterModal />}
        </Container>
      </Navbar>
    </>
  );
}