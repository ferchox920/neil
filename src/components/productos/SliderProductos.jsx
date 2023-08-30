import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export const SliderProductos = ({handleSelect, index, pageProductos}) => {
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
    {pageProductos.map((producto, productoIndex) => {
      if (productoIndex % 6 === 0) {
        const grupoProductos = pageProductos.slice(productoIndex, productoIndex + 6);
        
        return (
          <Carousel.Item key={productoIndex}>
            <div className="page-counter">
              <h1 className='text-light'>PRODUCTOS</h1>
              Página {index + 1} de {Math.round(pageProductos.length/6)}
            </div>
            <main>
              {grupoProductos.map((productoGrupo) => (
                <div key={productoGrupo.id} className={`producto-${productoGrupo.id}`}>
                  <div className="producto-datos shadow">
                    <img src={`.././src/assets/${productoGrupo.img1}`} style={{ zoom: "13%" }} alt={productoGrupo.nombre} />
                    <h3>{productoGrupo.nombre}</h3>
                    <p>${productoGrupo.precio}</p>
                    <button className="icon-button">
                      <span className="material-icons-outlined">add_circle</span>
                    </button>
                  </div>
                </div>
              ))}
            </main>
          </Carousel.Item>
        );
      }
      return null;
    })}
  </Carousel>
  )
}
