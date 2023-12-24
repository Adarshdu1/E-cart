import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CartProduct({ productId }) {
  const [stock, setStock] = useState(0);
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert("Removed from Cart");
  };

  const handlePurchase = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert("Purchased");
  };

  return (
    <>
      <div className="shadow-md rounded-md sm:w-2/3 shadow-gray-400  md:w-1/2 lg:w-1/3 mb-5">
        <Link to={`/product/${productId}`}>
          <div className="p-2 flex items-center justify-between space-x-2">
            <div className="flex flex-col items-center">
              <div className="">
                <img
                  src="https://robohash.org/perferendisideveniet.png"
                  alt=""
                  width={100}
                />
              </div>
              <div
                className={`${
                  stock ? "text-green-700" : "text-red-500"
                } font-semibold`}
              >
                {stock ? "In Stock" : "Out of Stock"}
              </div>
            </div>
            <div className="">
              <div className="font-bold">iPhone 12 Pro Max</div>
              <div className="">This phone is very good. Purchase it.</div>
              <div className="flex items-center justify-between font-semibold">
                <div className="">Price: $499</div>
                <div className="">Rating: 4.85</div>
              </div>
            </div>
          </div>
          <div className="flex  justify-evenly p-2 ">
            <button
              type="submit"
              className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 active:bg-red-700"
              onClick={handleRemove}
            >
              Remove from Cart{" "}
            </button>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
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
