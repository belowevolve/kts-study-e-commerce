import axios from "axios";
import { useState, useEffect } from "react";

export type Product = {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

const UseProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");

    if (response && response.data) setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};

export default UseProducts;
