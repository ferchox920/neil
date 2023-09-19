import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetalleProducto = () => {
  const {categoria, producto } = useParams(); // Obtiene los parámetros de la URL
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProductoDetalle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product/${producto}`
        );
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProductoDetalle();
  }, [setProduct]);
  return (
 
    <div >

      <h2>Detalle del Producto</h2>
      {product && (
         <div className="detalle-producto">
          
          <div className="logo-producto">
          <img src={''} alt="Logo de la marca" srcset="" />
          </div>
          <div className="producto-info">
          </div>
          <h2 className="producto-nombre">{product.name}</h2>

          <p>Precio: ${product.price}</p>
        </div>
      )}
    </div>
  );
};
