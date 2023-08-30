import React, { useState } from "react";
import { LoginForm } from "../login_form/LoginForm";
import { RegistrarUsuarioForm } from "../registrar-usuario_form/RegistrarUsuarioForm";
import { useMarketplace } from "../../context";

const RegisterModal = () => {
  //estado global
  const { showLogin } = useMarketplace(); 

  return (
    <>

    {/* rederizado condicional */}
      {showLogin ? <LoginForm /> : <RegistrarUsuarioForm />}
    </>
  );
};
export default RegisterModal;
