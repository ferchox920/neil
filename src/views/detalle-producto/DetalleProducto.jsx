import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export const DetalleProductoView = () => {
  const { categoria, producto } = useParams(); // Obtiene los parámetros de la URL
  const [product, setProduct] =useState({})


  useEffect(() => {
    const fetchProductoDetalle = async () => {
      try {
        const response = await fetch(`http://localhost:3000/product/${producto}`);
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProductoDetalle();
  }, [ setProduct]);

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  console.log(product);
  return (
    <div>
      <h2>Detalle del Producto</h2>
 
      {product && (
        <div>
          <h3>Detalles del Producto</h3>
          <img src={product.imageProfile} alt="asdas" srcset="" />
        
          <p>Nombre: {product.name}</p>
          <p>Precio: ${product.price}</p>
       
        </div>
      )}
    </div>
  );
};
