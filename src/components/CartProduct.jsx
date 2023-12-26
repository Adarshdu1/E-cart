import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CartProduct({ productId, setCartProducts }) {
  const [stock, setStock] = useState(0);
  const { setCartSize } = useAuth();
  const [product, setProduct] = useState({});
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart"));
    const check = confirm("Are you sure you want to remove this item?");
    if (!check) return;
    const newCart = cart.filter((item) => item !== productId);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartProducts(newCart);
    setCartSize(newCart.length);
  };

  const handlePurchase = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert("Purchased");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!res.ok) throw new Error("Error fetching product");
        const data = await res.json();
        setProduct(data);
        console.log(data);
        setStock(data.stock);
      } catch (error) {
        console.log("Error fetching product", error.message);
      }
    };
    fetchProduct();
  }, [setProduct, setStock, productId]);

  return (
    <>
      <div className="shadow-md rounded-md sm:w-2/3 shadow-gray-400  md:w-1/2 lg:w-1/3 mb-5">
        <Link to={`/product/${productId}`}>
          <div className="p-2 flex items-center justify-between space-x-5">
            <div className="flex flex-col items-center">
              <div className="">
                <img
                  src={product.thumbnail || "/trolley.png"}
                  alt=""
                  width={100}
                />
              </div>
              <div
                className={`${
                  stock ? "text-green-700" : "text-red-500"
                } font-semibold whitespace-nowrap`}
              >
                {stock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
            <div className="">
              <div className="font-bold">{product.title || "not avaiable"}</div>
              <div className="line-clamp-2">
                {product.description || "not available"}
              </div>
              <div className="flex items-center justify-between font-semibold">
                <div className="">Price: ${product.price}</div>
                <div className="">Rating: {product.rating}</div>
              </div>
            </div>
          </div>
          <div className="flex  justify-evenly p-2 ">
            <button
              type="submit"
              className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 whitespace-nowrap active:bg-red-700"
              onClick={handleRemove}
            >
              Remove from Cart{" "}
            </button>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              onClick={handlePurchase}
              disabled={!stock}
            >
              Buy Now
            </button>
          </div>
        </Link>
      </div>
    </>
  );
}
