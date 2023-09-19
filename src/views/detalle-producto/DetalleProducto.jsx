import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const DetalleProductoView = () => {
  const { categoria, producto } = useParams(); // Usamos useParams para obtener los parámetros de la URL

  return (
    <div>
      <h2>Detalle del Producto</h2>
      <p>Categoría: {categoria}</p>
      <p>Producto: {producto}</p>
      {/* Aquí puedes mostrar los detalles del producto que hayas recuperado */}
    </div>
  );
};
