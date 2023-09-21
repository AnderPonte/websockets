// En public/js/main.js
const socket = io();

// Escuchar eventos de actualización de productos
socket.on("productosActualizados", (productos) => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.textContent = producto.name;
    productList.appendChild(li);
  });
});

// Manejar el envío del formulario
const productForm = document.getElementById("productForm");
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const productName = document.getElementById("productName").value;
  socket.emit("crearProducto", { id: Date.now(), name: productName }); // Usamos Date.now() como ID temporal
  document.getElementById("productName").value = ""; // Limpiar el campo de entrada
});
