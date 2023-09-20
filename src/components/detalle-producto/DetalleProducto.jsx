import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './DetalleProducto.scss';

export const DetalleProducto = () => {
  const { producto } = useParams(); // Obtiene el parámetro de la URL
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
  }, [producto]);
  return (
 
    <div className="detalle-producto">
      <div className="logo-producto">
        <img
          src="https://www.pngjoy.com/pngm/150/3007703_snes-nintendo-64-logo-hd-png-download.png"
          alt="Logo de la marca"
        />
      </div>
      <div className="producto-info">
        <h2 className="producto-nombre">{product.name}</h2>
        <p className="producto-descripcion">{product.description}</p>
        <div className="producto-imagen">
          <img src={product.imageProfile} alt="Producto" />
        </div>
        <p className="producto-precio">
          <big>Precio:</big> <strong>${product.price}</strong>
        </p>
        <button className="agregar-carrito">Agregar al Carrito</button>
      </div>
    </div>
  );
};