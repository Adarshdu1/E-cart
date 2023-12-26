import React, { useEffect } from "react";
import HomeProduct from "./HomeProduct";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

export default function Home() {
  const [filter, setFilter] = React.useState(10000);
  const [filteredData, setFilteredData] = React.useState([]);

  const { allProduct } = useProduct();
  const handleFilter = () => {
    const data = allProduct?.filter((item) => {
      return item.price <= filter;
    }, []);
    setFilteredData(data);
  };

  useEffect(() => {
    handleFilter();
  }, [filter]);

  const productsList = filteredData?.map((product) => {
    return (
      <Link to={`/product/${product.id}`} key={product.id}>
        <HomeProduct product={product} />
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
        <div className="pt-5 pb-20 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 justify-items-center">
          {productsList}
        </div>
      </div>
    </>
  );
}
