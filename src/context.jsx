import { createContext, useState, useEffect, useContext } from "react";

// Crea un contexto de React llamado MarketplaceContext
const MarketplaceContext = createContext({});

// Define un componente funcional llamado MarketplaceProvider que recibe "children" como propiedad
// eslint-disable-next-line react/prop-types
export const MarketplaceProvider = ({ children }) => {
  // Define varios estados usando el hook useState
  const [productos, setProductos] = useState([]); // Estado para almacenar productos
  const [categoria, setCategoria] = useState("all"); // Estado para la categoría actual
  const [pageProductos, setPageProductos] = useState([]); // Estado para los productos a mostrar en la página
  const [showLogin, setShowLogin] = useState(true); // Estado para mostrar/ocultar el inicio de sesión
  const [showModal, setShowModal] = useState(true); // Estado para mostrar/ocultar un modal
  const [car, setCar] = useState([]);

  // Utiliza el hook useEffect para cargar datos de productos cuando se monta el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("src/db/productos.json"); // Realiza una solicitud para obtener datos de productos
        const data = await response.json(); // Convierte la respuesta en un objeto JavaScript
        setProductos(data); // Actualiza el estado de productos con los datos obtenidos
        setPageProductos(data); // Inicialmente, muestra todos los productos en la página
      } catch (error) {
        console.error("Error en el fetch", error); // Manejo de errores en caso de problemas con la solicitud
      }
    };

    fetchProductos(); // Llama a la función de carga de productos
  }, []); // El segundo argumento vacío [] asegura que este efecto se ejecute solo una vez al montar el componente

  // Utiliza useEffect para filtrar los productos en función de la categoría seleccionada
  useEffect(() => {
    const filtrarProductos = () => {
      if (categoria !== "all") {
        // Filtra los productos en base a la categoría seleccionada
        const newProductos = productos.filter(
          (producto) => producto.categoria === categoria
        );
        setPageProductos(newProductos); // Actualiza la lista de productos a mostrar
      } else if (categoria === "all") {
        setPageProductos(productos); // Si la categoría es 'all', muestra todos los productos
      }
    };
    filtrarProductos(); // Llama a la función de filtrado de productos
  }, [categoria, productos]); // El efecto se ejecutará cuando cambie la categoría o la lista de productos

  // Crea un objeto globalState que contiene todos los estados y funciones relevantes
  const globalState = {
    car,
    setCar,
    productos,
    pageProductos,
    setPageProductos,
    categoria,
    setCategoria,
    showLogin,
    setShowLogin,
    showModal,
    setShowModal,
  };

  // Utiliza el contexto de React para proporcionar globalState a los componentes hijos
  return (
    <MarketplaceContext.Provider value={globalState}>
      {children} {/* Renderiza los componentes hijos */}
    </MarketplaceContext.Provider>
  );
};

// Define un hook personalizado llamado useMarketplace que permite acceder al contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useMarketplace = () => {
  const context = useContext(MarketplaceContext); // Obtiene el contexto de MarketplaceContext
  if (!context) {
    throw new Error(
      "useMarketplace debe ser utilizado dentro de un MarketplaceProvider"
    );
  }
  return context; // Devuelve el objeto globalState que contiene los estados y funciones
};
