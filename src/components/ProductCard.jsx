import React, { useEffect } from "react";

export default function ProductCard() {
  const [inStock, setInStock] = React.useState(0);
  const [index, setIndex] = React.useState(0);
  const images = ["/trolley.png", "/profile.png", "/trolley.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert("Added to Cart");
  };

  const handlePurchase = (e) => {
    e.stopPropagation();
    e.preventDefault();
    alert("Purchased");
  };
  return (
    <>
      {/* Searched Item Detailed Information*/}
      <div className="mt-5 relative max-w-6xl mx-auto m-4">
        <h1 className="text-center text-4xl font-semibold py-10">Trolley</h1>
        <div className="flex md:flex-row flex-col justify-evenly items-center">
          <div className="flex overflow-auto justify-center md:w-1/4 w-1/2 ">
            <div className="relative inline-block pb-2">
              <img
                src={images[index]}
                alt=""
                className={`w-full ${!inStock && "blur-sm"} `}
              />
              {!inStock && (
                <div className="text-red-500 font-bold absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 drop-shadow-2xl bg-gray-200 rounded-md whitespace-nowrap p-1">
                  Out of Stock
                </div>
              )}
            </div>
          </div>
          <div className="pb-5">
            <div className="mt-5 ">
              <p className="text-xl mt-2">This is the best trolley</p>
            </div>
            <div className="grid grid-cols-2">
              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Price</h1>
                <p className="text-xl mt-2">$ 100</p>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Discount</h1>
                <p className="text-xl mt-2">$ 100</p>
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Rating</h1>
                <p className="text-xl mt-2">4.86</p>
              </div>

              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Category</h1>
                <p className="text-xl mt-2">Furniture</p>
              </div>

              <div className="mt-5 ">
                <h1 className="text-2xl font-semibold">Brand</h1>
                <p className="text-xl mt-2">Avon</p>
              </div>

              <div className="mt-5">
                <h1 className="text-2xl font-semibold">Stock</h1>
                <p className="text-xl mt-2">140</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-10 pb-16">
          <button
            type="submit"
            className="bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-600 active:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            Add to Cart
          </button>
          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handlePurchase}
            disabled={!inStock}
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}
