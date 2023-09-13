/* eslint-disable react/prop-types */
import Carousel from 'react-bootstrap/Carousel';
import { useMarketplace } from '../../context'

// eslint-disable-next-line react/prop-types
export const SliderProductos = ({handleSelect, index, pageProductos}) => {
  const {car, setCar } = useMarketplace()

  const onAgregarProducto = (producto) => {
  
    console.log('_________')
    console.log(car)
    console.log(producto)
    setCar((car) => [...car, producto]);
  };

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
                    <button
                        className="icon-button"
                        onClick={() => onAgregarProducto(productoGrupo)} // Pasar el producto a la función
                      >
                        <span className="material-icons-outlined">
                          <big>+</big>
                        </span>
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