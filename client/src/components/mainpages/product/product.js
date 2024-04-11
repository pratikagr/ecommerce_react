import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../utils/ProductList/ProductList";

function Product() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = useContext(GlobalState);
  const [products] = state.productApi.products;
  return (
    <div className="products">
      {products.map((product) => {
        return <ProductList key={product.id} product={product} />;
      })}
    </div>
  );
}

export default Product;
