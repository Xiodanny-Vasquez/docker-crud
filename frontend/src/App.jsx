import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const API_URL = 'http://localhost:3001/products';


const App = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Cuido');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Error al obtener productos:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, price, description, category };

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editId}`, newProduct);
      } else {
        await axios.post(API_URL, newProduct);
      }

      // Limpiar formulario
      setName('');
      setPrice('');
      setDescription('');
      setCategory('Cuido');
      setIsEditing(false);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error al guardar producto:", err);
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setIsEditing(true);
    setEditId(product.id);
  };

  const handleCancelEdit = () => {
    setName('');
    setPrice('');
    setDescription('');
    setCategory('Cuido');
    setIsEditing(false);
    setEditId(null);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Error al eliminar producto:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>🐱 Tienda de Gatitos</h1>

      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label>Precio:</label>
        <input 
          type="number" 
          step="0.01"
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />

        <label>Descripción:</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />

        <label>Categoría:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Cuido">Cuido</option>
          <option value="Arena">Arena</option>
          <option value="Juguete">Juguete</option>
          <option value="Accesorio">Accesorio</option>
        </select>

        <button type="submit">{isEditing ? 'Actualizar' : 'Agregar'} producto</button>
        {isEditing && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        )}
      </form>

      <h2>🛍 Productos disponibles</h2>
      <ul>
        {products.length === 0 ? (
          <p>No hay productos aún.</p>
        ) : (
          products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.price} <br />
              <em>{product.description}</em> <br />
              Categoría: {product.category} <br />
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button onClick={() => deleteProduct(product.id)} style={{ marginLeft: '10px' }}>
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default App;
