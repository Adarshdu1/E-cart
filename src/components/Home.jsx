import React from "react";
import HomeProduct from "./HomeProduct";
import { Link } from "react-router-dom";

export default function Home() {
  const products = [1, 2, 3, 4, 5, 6];
  const [filter, setFilter] = React.useState(1000);
  const productsList = products.map((product) => {
    return (
      <Link to={`/product/${product}`} key={product}>
        <HomeProduct />
      </Link>
    );
  });
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center pt-5">
          <div className="flex justify-between items-center p-2 w-[300px]">
            <div className="font-semibold">Price filter: </div>
            <input
              type="range"
              name=""
              id=""
              min={0}
              max={1000}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <div className="font-semibold">${filter}</div>
          </div>
        </div>
        <div className="pt-5 pb-16 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 justify-items-center">
          {productsList}
        </div>
      </div>
    </>
  );
}
