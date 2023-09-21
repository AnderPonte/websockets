const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { engine } = require("express-handlebars");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurar Handlebars como motor de plantillas
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Rutas
app.get("/", (req, res) => {
  res.render("home");
});

// Configurar Socket.io
const productos = []; // Array para almacenar productos

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  // Enviar lista de productos al cliente que se conecta
  socket.emit("productosActualizados", productos);

  // Manejar eventos de creación y eliminación de productos
  socket.on("crearProducto", (producto) => {
    // Lógica para agregar un producto
    productos.push(producto);
    // Emitir el evento de actualización a todos los clientes conectados
    io.emit("productosActualizados", productos);
  });

  socket.on("eliminarProducto", (productoId) => {
    // Lógica para eliminar un producto
    const index = productos.findIndex((producto) => producto.id === productoId);
    if (index !== -1) {
      productos.splice(index, 1);
      // Emitir el evento de actualización a todos los clientes conectados
      io.emit("productosActualizados", productos);
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log("Servidor en ejecución en el puerto 3000");
});
