import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProductCard() {
  const { productId } = useParams();
  const [stock, setStock] = React.useState(0);
  const [product, setProduct] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const [images, setImages] = React.useState([]);
  const { setCartSize } = useAuth();
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
    let alreadyInCart = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] == productId) {
        alreadyInCart = true;
        alert("Already in Cart");
        break;
      }
    }
    if (alreadyInCart) return;
    const check = confirm("Are you sure you want to add this item to cart?");
    if (!check) return;

    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSize(cart.length);
    alert("Added to Cart");
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
        setImages(data.images);
        console.log(data.images);
        setStock(data.stock);
      } catch (error) {
        console.log("Error fetching product", error.message);
      }
    };
    fetchProduct();
  }, [setProduct, setStock, productId]);

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      {/* Searched Item Detailed Information*/}
      <div className="mt-5 relative max-w-6xl mx-auto m-4">
        <h1 className="text-center text-4xl font-semibold py-10">
          {product?.title}
        </h1>
        <div className="flex md:flex-row flex-col justify-evenly items-center">
          <div className="flex overflow-auto justify-center md:w-1/4 w-1/2 ">
            <div className="relative inline-block pb-2">
              <img
                src={images[index]}
                alt=""
                className={`w-full ${!stock && "blur-sm"} `}
              />
              {!stock && (
                <div className="text-red-500 font-bold absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 drop-shadow-2xl bg-gray-200 rounded-md whitespace-nowrap p-1">
                  Out of Stock
                </div>
              )}
            </div>
          </div>
          <div className="pb-5">
            <div className="mt-5 ">
              <p className="text-xl mt-2 px-10">{product?.description}</p>
            </div>
            <div className="px-10 grid grid-cols-2">
              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Price</h1>
                <p className="text-xl mt-2">$ {product?.price}</p>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Discount</h1>
                <p className="text-xl mt-2">{product?.discountPercentage} %</p>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Rating</h1>
                <p className="text-xl mt-2">{product?.rating}</p>
              </div>

              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Category</h1>
                <p className="text-xl mt-2">{capitalize(product?.category)}</p>
              </div>

              <div className="mt-5 ">
                <h1 className="text-2xl font-semibold">Brand</h1>
                <p className="text-xl mt-2">{product?.brand}</p>
              </div>

              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Stock</h1>
                <p className="text-xl mt-2">{stock}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-10 pb-16">
          <button
            type="submit"
            className="bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-600 active:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            onClick={handleAddToCart}
            disabled={!stock}
          >
            Add to Cart
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
      </div>
    </>
  );
}
