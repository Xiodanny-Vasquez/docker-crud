#!/bin/sh

echo "⏳ Esperando a que MySQL esté disponible en el puerto 3306..."

# Bucle hasta que el puerto 3306 de MySQL esté abierto
while ! nc -z mysql 3306; do
  sleep 1
done

echo "✅ MySQL está listo. Iniciando backend..."
exec node index.js
