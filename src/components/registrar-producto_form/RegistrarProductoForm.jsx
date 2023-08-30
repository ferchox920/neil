
import React, { useState } from 'react';

const RegistrarProductoForm = () => {
  const [product, setProduct] = useState({
    id: '',
    nombre: '',
    categoria: '',
    precio: '',
    img1: '',
    img2: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform actions to submit the product data
    console.log('Product data:', product);
    // Clear the form fields
    setProduct({
      id: '',
      nombre: '',
      categoria: '',
      precio: '',
      img1: '',
      img2: '',
    });
  };

  return (
    <div>
      <h2>Registrar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={product.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="categoria"
            value={product.categoria}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={product.precio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Imagen 1:</label>
          <input
            type="text"
            name="img1"
            value={product.img1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Imagen 2:</label>
          <input
            type="text"
            name="img2"
            value={product.img2}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Registrar Producto</button>
      </form>
    </div>
  );
};

export default RegistrarProductoForm;
