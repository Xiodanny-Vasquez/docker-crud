const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'xio',
  password: process.env.DB_PASSWORD || 'xio1020',
  database: process.env.DB_NAME || 'CatShopDB',
});

// Conectar con reintento
function connectWithRetry() {
  db.connect((err) => {
    if (err) {
      console.error('❌ Error al conectar a MySQL, reintentando en 5 segundos...', err);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('✅ Conectado a MySQL');
    }
  });
}
connectWithRetry();

// Rutas CRUD

// Obtener todos los productos
app.get('/products', (req, res) => {
  db.query('SELECT * FROM Products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Crear producto
app.post('/products', (req, res) => {
  const { name, price, description, category } = req.body;
  db.query(
    'INSERT INTO Products (name, price, description, category) VALUES (?, ?, ?, ?)',
    [name, price, description, category],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId, message: 'Producto creado' });
    }
  );
});

// Actualizar producto
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;
  db.query(
    'UPDATE Products SET name=?, price=?, description=?, category=? WHERE id=?',
    [name, price, description, category, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Producto actualizado' });
    }
  );
});

// Eliminar producto
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM Products WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Producto eliminado' });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Backend escuchando en http://localhost:${port}`);
});
