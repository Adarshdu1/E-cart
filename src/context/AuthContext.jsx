import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
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
        setUser(data);
        localStorage.setItem("token", data.token);
        return data.token;
      } else {
        alert("Invalid username or password");
        throw new Error(data.message);
      }
    } catch (error) {
      console.log("Authentication failed", error.message);
    }
  };

  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
