import React from "react";
import { useAuth } from "../context/AuthContext";

export default function HomeProduct({ product }) {
  const [inStock, setInStock] = React.useState(product.stock);
  const { setCartSize } = useAuth();
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cart);
    let alreadyInCart = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i] == product.id) {
        alreadyInCart = true;
        alert("Already in Cart");
        break;
      }
    }
    if (alreadyInCart) return;
    const check = confirm("Are you sure you want to add this item to cart?");
    if (!check) return;

    cart.push(product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartSize(cart.length);
    alert("Added to Cart");
  };

  const handlePurchase = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert("Purchased");
  };
  return (
    <>
      <div className="w-[250px] shadow-lg shadow-gray-700 rounded-md p-1">
        <div className="flex flex-col items-center">
          <div className="relative inline-block pb-2">
            <img
              src={product?.thumbnail}
              alt=""
              className={`${!inStock && "blur-sm"} h-40`}
            />
            {!inStock && (
              <div className="text-red-500 font-bold absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 drop-shadow-2xl bg-gray-200 rounded-md whitespace-nowrap p-1">
                Out of Stock
              </div>
            )}
          </div>
          <div className="font-bold uppercase">{product?.title}</div>
          <div className="flex items-center justify-between font-semibold space-x-5 pb-2">
            <div className="">Price: ${product.price}</div>
            <div className="">Rating: {product.rating}</div>
          </div>
          <div className="flex justify-between space-x-5 pb-2">
            <button
              type="submit"
              className="bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-600 active:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              disabled={!inStock}
              onClick={handlePurchase}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
