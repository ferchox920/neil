import  { createContext, useState, useEffect, useContext } from "react";

const MarketplaceContext = createContext({});

// eslint-disable-next-line react/prop-types
export const MarketplaceProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('all');
  const [pageProductos, setPageProductos] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('src/db/productos.json');
        const data = await response.json();
        setProductos(data);
        setPageProductos(data);
      } catch (error) {
        console.error('Error en el fetch', error);
      }
    };
    
    fetchProductos();
  }, []);

  useEffect(() => {
    const filtrarProductos = () => {
      if (categoria !== 'all') {
        const newProductos = productos.filter(producto => producto.categoria === categoria);
        setPageProductos(newProductos);
      } else if (categoria === 'all') {
        setPageProductos(productos);
      }
    }; 
    filtrarProductos();
  }, [categoria, productos]);

  const globalState = {
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

  return (
    <MarketplaceContext.Provider value={globalState}>
      {children}
    </MarketplaceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace debe ser utilizado dentro de un MarketplaceProvider");
  }
  return context;
};
