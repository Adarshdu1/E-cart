import React, { useContext, createContext } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [allProduct, setAllProduct] = React.useState(
    JSON.parse(localStorage.getItem("Products")) || []
  );

  const fetchAllProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products`);

      if (!res.ok) throw new Error("Error fetching product");

      const data = await res.json();

      console.log(data.products);
      setAllProduct(data.products);
      localStorage.setItem("Products", JSON.stringify(data.products));
    } catch (error) {
      console.log("Error fetching product", error.message);
    }
  };
  return (
    <ProductContext.Provider
      value={{ allProduct, setAllProduct, fetchAllProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within ProductProvider");
  return context;
};

export { ProductProvider, useProduct };
