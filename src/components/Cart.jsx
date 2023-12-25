import React from "react";
import CartProduct from "./CartProduct";
export default function Cart() {
  const [cartProducts, setCartProducts] = React.useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const cartProductsList = cartProducts.map((product) => {
    return (
      <CartProduct
        productId={product}
        key={product}
        setCartProducts={setCartProducts}
      />
    );
  });
  return (
    <>
      <div className="font-bold text-4xl text-center p-3">Cart</div>

      <div className="pb-16 flex flex-col justify-center items-center">
        {cartProductsList}
      </div>
    </>
  );
}
