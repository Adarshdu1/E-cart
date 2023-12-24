import React from "react";

export default function HomeProduct() {
  const [inStock, setInStock] = React.useState(0);

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
      <div className="w-[250px] shadow-lg shadow-gray-700 rounded-md">
        <div className="flex flex-col items-center">
          <div className="relative inline-block pb-2">
            <img
              src="https://robohash.org/perferendisideveniet.png"
              alt=""
              width={200}
              className={`${!inStock && "blur-sm"} `}
            />
            {!inStock && (
              <div className="text-red-500 font-bold absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 drop-shadow-2xl bg-gray-200 rounded-md whitespace-nowrap p-1">
                Out of Stock
              </div>
            )}
          </div>
          <div className="font-bold uppercase">iPhone 12 Pro Max</div>
          <div className="flex items-center justify-between font-semibold space-x-5 pb-2">
            <div className="">Price: $499</div>
            <div className="">Rating: 4.85</div>
          </div>
          <div className="flex justify-between space-x-5 pb-2">
            <button
              type="submit"
              className="bg-slate-500 p-2 rounded-lg text-white hover:bg-slate-600 active:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed "
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
