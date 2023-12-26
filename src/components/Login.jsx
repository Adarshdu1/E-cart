import React, { useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import Spinner from "./Spinner";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login, storeCart } = useAuth();

  const { fetchAllProduct } = useProduct();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProduct = async () => {
      await fetchAllProduct();
    };

    if (token) {
      fetchProduct();
      navigate("/");
    }
  }, []);

  const verifyLogin = async (e) => {
    e.preventDefault();

    if (!(username && password))
      return alert("Please enter username and password");
    setLoading(true);
    const token = await login(username, password);
    await storeCart();
    // console.log(token);
    if (token) {
      await fetchAllProduct();
      navigate("/");
    }
    setLoading(false);
  };

  const verifyGuestUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = await login("atuny0", "9uQFF1Lh");
    await storeCart();
    // console.log(token);
    if (token) {
      await fetchAllProduct();
      navigate("/");
    }
    setLoading(false);
  };
  return (
    <>
      <div className="bg-[url('https://images.unsplash.com/photo-1600456899121-68eda5705257?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] w-full min-h-screen bg-cover bg-no-repeat p-2">
        <div className={`lg:w-1/3 w-2/3  m-auto pt-40 ${loading && "blur-sm"}`}>
          <div className="bg-white rounded-3xl p-5 shadow-lg shadow-slate-600 ">
            <h1 className="text-center text-4xl pb-6 font-bold">Login</h1>
            <div className="flex flex-col items-center ">
              <input
                type="text"
                name="Username"
                id="username"
                placeholder="Username"
                className="border-0 sm:text-xl border-b-2 mb-5 p-1  focus:outline-none sm:w-9/12 w-full "
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                name="Password"
                id="password"
                placeholder="Password"
                className="border-0 border-b-2 sm:text-xl sm:w-9/12 w-full p-1 mb-5 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-evenly items-center space-x-5">
                <button
                  className="py-2 px-3 bg-blue-500 rounded-xl text-white text-xl hover:bg-blue-600 active:bg-blue-700"
                  onClick={verifyLogin}
                >
                  Login
                </button>
                <button
                  className="py-2 px-3 bg-red-500 rounded-xl whitespace-nowrap text-white text-xl hover:bg-red-600 active:bg-red-700"
                  onClick={verifyGuestUser}
                >
                  Guest User
                </button>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
