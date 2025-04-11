// src/components/ProductList.jsx
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/products";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  const deleteProduct = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Productos para Gatos</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> - ${p.precio}
            <button onClick={() => deleteProduct(p.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
