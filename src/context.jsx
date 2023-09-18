  import { createContext, useState, useEffect, useContext } from "react"



  const MarketplaceContext = createContext({})

  export const MarketplaceProvider = ({ children }) =>{
    
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('all')
  const [pageProductos, setPageProductos] = useState([])
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch('http://localhost:3000/product');
        const data = await response.json();
        setProductos(data);
        setPageProductos(data);
      } catch (error) {
        console.error('Error en el fetch', error);
      }
    }
    
    fetchProductos();
  }, []);



  useEffect(() => {
    const filtrarProductos = ()=>{
      if(categoria != 'all'){
        const newProductos = productos.filter(producto=> producto.categoria === categoria)
        setPageProductos(newProductos)
      }else if(categoria === 'all'){
        setPageProductos(productos)
      }
    } 
    filtrarProductos()
  }, [categoria, productos])

  const globalState = {
    productos,
    pageProductos,
    setPageProductos,
    setCategoria,
    showLogin,
    setShowLogin,
  };

          return (
              <MarketplaceContext.Provider
                value={globalState}
              >
                {children}
              </MarketplaceContext.Provider>
            );
  
  }

  export const useMarketplace = ()=> useContext(MarketplaceContext)