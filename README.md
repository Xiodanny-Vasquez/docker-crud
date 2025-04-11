🐾 Tienda de Gatitos - Proyecto Final con Docker
Este proyecto es una tienda de productos para gatos, con un CRUD completo (Crear, Leer, Actualizar, Eliminar) que incluye:

Frontend: React + Vite

Backend: Node.js + Express

Base de datos: MySQL

Adminer para gestión visual de la base de datos

Todo 100% contenedorizado con Docker

🚀 Cómo levantar el proyecto
docker-compose up --build

🐬 Credenciales de la Base de Datos (MySQL)
Host: db

Usuario: xio

Contraseña: xio

Base de datos: tienda_gatos

Puerto local: 3307 (el 3306 es el interno del contenedor)

Puedes acceder visualmente desde Adminer:

URL: http://localhost:8080

Sistema: MySQL

Servidor: db

Usuario: xio

Contraseña: xio

Base de datos: tienda_gatos

🔌 Endpoints del API (Backend - Express)
La API corre en http://localhost:3001

📄 Obtener todos los productos
GET /productos

Respuesta:

[ { "id": 1, "nombre": "Cuido premium", "precio": 15000, "descripcion": "Cuido para gato adulto" } ]

➕ Crear un nuevo producto
POST /productos

Body (JSON):

{ "nombre": "Juguete ratón", "precio": 8000, "descripcion": "Ratón de tela con catnip" }

✏️ Actualizar un producto
PUT /productos/:id

Body (JSON):

{ "nombre": "Juguete ratón XL", "precio": 9000, "descripcion": "Ratón con sonido" }

❌ Eliminar un producto
DELETE /productos/:id

🌐 Frontend (React + Vite)
Corre en http://localhost:5173

Este consume los endpoints del backend para mostrar, crear, editar y eliminar productos.

⚙️ Servicios y puertos del docker-compose.yml
Servicio	Puerto local	Puerto contenedor	Descripción
frontend	5173	5173	React + Vite
backend	3001	3001	Node.js + Express
db (MySQL)	3307	3306	Base de datos
adminer	8080	8080	Interfaz para gestionar la base
📦 Estructura del proyecto
proyecto_final_docker/
├── backend/
│ └── index.js
├── frontend/
│ └── (archivos de React + Vite)
├── init.sql
├── .env
├── docker-compose.yml
└── README.md
