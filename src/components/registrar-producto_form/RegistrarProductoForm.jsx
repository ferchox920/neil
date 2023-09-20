import React, { useState } from 'react';
import axios from 'axios';

const RegistrarProductoForm = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    code: '',
    quantity: '',
    images: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;
    const imageFiles = Array.from(files);
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: imageFiles,
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Obtén el token de administrador del localStorage
      const adminToken = localStorage.getItem('token');
      console.log(adminToken);

      // Configura los encabezados de la solicitud axios con el token de administrador
      const headers = {
        Authorization: `Bearer ${adminToken}`,
      };

      // Crea un objeto FormData para enviar archivos
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('code', product.code);
      formData.append('quantity', product.quantity);

      // Agrega archivos de imagen al FormData
      for (const imageFile of product.images) {
        formData.append('image', imageFile);
      }

      // Realiza la solicitud POST al servidor con los datos del producto y el token de administrador
      const response = await axios.post('http://localhost:3000/product', formData, {
        headers,
      });

      console.log('Respuesta del servidor:', response.data);

      // Limpia los campos del formulario
      setProduct({
        name: '',
        category: '',
        price: '',
        description: '',
        code: '',
        quantity: '',
        images: [],
      });
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };



  return (
    <div>
      <h2>Registrar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            <option value="NINTENDO">Nintendo</option>
            <option value="PLAYSTATION">Playstation</option>
            <option value="ATARI">Atari</option>
            <option value="SEGA">Sega</option>
          </select>
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Código:</label>
          <input
            type="text"
            name="code"
            value={product.code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
        <label>Imágenes:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <div>
          <label>Imágenes seleccionadas:</label>
          <ul>
            {product.images.map((image, index) => (
              <li key={index}>
                {image.name}
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Registrar Producto</button>
      </form>
    </div>
  );
};

export default RegistrarProductoForm;