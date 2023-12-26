import React, { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cartSize, setCartSize] = React.useState(
    JSON.parse(localStorage.getItem("cart"))?.length || 0
  );
  const login = async (username, password) => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return alert("Invalid username or password");
      console.log("Hello");
      const data = await res.json();
      console.log(data);
      if (data) {
        const { token, ...userData } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        return token;
      } else {
        alert("Invalid username or password");
        throw new Error(data.message);
      }
    } catch (error) {
      console.log("Authentication failed", error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("Products");
  };

  const storeCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const id = user.id;
      const res = await fetch(`https://dummyjson.com/carts/user/${id}`);
      if (!res.ok) throw new Error("Error fetching cart");
      const data = await res.json();
      console.log(data.carts[0].products);
      if (data) {
        const cartId = [];
        data.carts[0].products.forEach((product) => {
          cartId.push(product.id);
        });
        setCartSize(cartId.length);
        localStorage.setItem("cart", JSON.stringify(cartId));
      }
    } catch (error) {
      console.log("Error fetching cart", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, storeCart, cartSize, setCartSize }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export { AuthProvider, useAuth };
