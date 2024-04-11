import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductAPI() {
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return {
    products: [products, setProducts],
  };
}

export default ProductAPI;
