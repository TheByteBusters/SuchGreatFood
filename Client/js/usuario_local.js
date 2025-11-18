// ARCHIVO: client/js/usuario_local.js

// Pantalla de carga
window.addEventListener("load", () => {
  setTimeout(() => {
    const pantallaNegra = document.getElementById("pantalla-negra");
    pantallaNegra.style.transition = "opacity 0.5s ease";
    pantallaNegra.style.opacity = "0";

    setTimeout(() => {
      pantallaNegra.style.display = "none";
    }, 500);
  }, 2500);
});

// Funciones para formularios
function mostrarFormularioProducto() {
  document.getElementById("formularioProducto").style.display = "block";
}

function ocultarFormularioProducto() {
  document.getElementById("formularioProducto").style.display = "none";
}

// Funciones para Ingredientes (sin cambios)
function mostrarFormularioIngrediente() {
  document.getElementById("formularioIngrediente").style.display = "block";
}

function ocultarFormularioIngrediente() {
  document.getElementById("formularioIngrediente").style.display = "none";
}

function agregarIngrediente() {
  const nombre = document.getElementById("nombreIngrediente").value;
  const cantidad = document.getElementById("cantidadIngrediente").value;
  const precio = document.getElementById("precioIngrediente").value;

  const tabla = document.getElementById("ingredientes");
  const nuevaFila = tabla.insertRow();

  nuevaFila.insertCell(0).innerText = nombre;
  nuevaFila.insertCell(1).innerText = cantidad;
  nuevaFila.insertCell(2).innerText = precio;

  const celdaAcciones = nuevaFila.insertCell(3);
  celdaAcciones.innerHTML = `
    <button onclick="editarIngrediente(this)">✏️ Editar</button>
    <button onclick="eliminarIngrediente(this)">❌ Eliminar</button>
  `;

  document.getElementById("nombreIngrediente").value = "";
  document.getElementById("cantidadIngrediente").value = "";
  document.getElementById("precioIngrediente").value = "";

  ocultarFormularioIngrediente();
}

function eliminarIngrediente(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function editarIngrediente(button) {
  const row = button.parentNode.parentNode;
  const celdas = row.getElementsByTagName("td");

  for (let i = 0; i < celdas.length - 1; i++) {
    const valorActual = celdas[i].innerText;
    celdas[i].innerHTML = `<input type="text" value="${valorActual}" />`;
  }

  button.innerText = "💾 Guardar";
  button.setAttribute("onclick", "guardarIngrediente(this)");
}

function guardarIngrediente(button) {
  const row = button.parentNode.parentNode;
  const celdas = row.getElementsByTagName("td");

  for (let i = 0; i < celdas.length - 1; i++) {
    const input = celdas[i].getElementsByTagName("input")[0];
    celdas[i].innerText = input.value;
  }

  button.innerText = "✏️ Editar";
  button.setAttribute("onclick", "editarIngrediente(this)");
}

// Logout
function cerrarSesion() {
  alert("Has cerrado sesión.");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  window.location.href = "index.html";
}

// Íconos por categoría (la lógica base que usará cart.js)
const categoryIcons = {
    lomos: "fa-drumstick-bite",
    LOMOS: "fa-drumstick-bite",

    hamburguesas: "fa-hamburger",
    HAMBURGUESAS: "fa-hamburger",

    empanadas: "fa-pizza-slice",
    EMPANADAS: "fa-pizza-slice",

    bebidas: "fa-wine-bottle",
    BEBIDAS: "fa-wine-bottle",

    postres: "fa-ice-cream",
    POSTRES: "fa-ice-cream",

    default: "fa-utensils"
};


// AGREGAR PRODUCTO (sin imagen)
async function agregarProductos() {
  const nuevoProducto = {
    category: document.getElementById("categoriaProducto").value.toLowerCase().trim(),
    productName: document.getElementById("nombreProducto").value,
    price: Number(document.getElementById("precioProducto").value),
    details: document.getElementById("detallesProducto").value,
    ingredients: document.getElementById("ingredientesProducto").value
  };

  if (nuevoProducto.productName && nuevoProducto.price) {
    try {
      const response = await fetch("/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      const data = await response.json();
      alert(data.message || "Producto agregado");
      document.getElementById("productos").innerHTML = "";
    } catch (error) {
      console.error(error);
      alert("Error al agregar el producto");
    }
  } else {
    alert("El nombre y el precio son obligatorios.");
  }

  document.getElementById("nombreProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("ingredientesProducto").value = "";
  document.getElementById("detallesProducto").value = "";

  ocultarFormularioProducto();
  obtenerProductos();
}

// OBTENER PRODUCTOS SIN IMÁGENES (USANDO ICONOS)
async function obtenerProductos() {
  try {
    const response = await fetch("/products");
    const productos = await response.json();

    const tabla = document.getElementById("productos");
    tabla.innerHTML = "";

    productos.forEach((producto) => {
      const nuevaFila = tabla.insertRow();

      const celdaIcono = nuevaFila.insertCell(0);
      const celdaCategoria = nuevaFila.insertCell(1);
      const celdaNombre = nuevaFila.insertCell(2);
      const celdaPrecio = nuevaFila.insertCell(3);
      const celdaDetalles = nuevaFila.insertCell(4);
      const celdaIngredientes = nuevaFila.insertCell(5);
      const celdaAcciones = nuevaFila.insertCell(6);

      const icon = categoryIcons[producto.category.trim()] || categoryIcons.default;


      celdaIcono.innerHTML = `
        <div class="product-icon">
          <i class="fas ${icon}"></i>
        </div>
      `;

      celdaCategoria.innerText = producto.category;
      celdaNombre.innerText = producto.productName;
      celdaPrecio.innerText = producto.price;
      celdaDetalles.innerText = producto.details;
      celdaIngredientes.innerText = producto.ingredients;

      const botonEliminar = document.createElement("button");
      botonEliminar.innerHTML = '<i class="fas fa-trash-alt"></i> Eliminar';
      botonEliminar.classList.add("btn");
      botonEliminar.addEventListener("click", () => eliminarProducto(producto.id));

      const botonEditar = document.createElement("button");
      botonEditar.innerHTML = '<i class="fas fa-edit"></i> Editar';
      botonEditar.classList.add("btn");
      botonEditar.addEventListener("click", () => editarProducto(producto));

      celdaAcciones.appendChild(botonEliminar);
      celdaAcciones.appendChild(botonEditar);
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}

// EDITAR PRODUCTO (sin imagen)
async function editarProducto(producto) {
  const nuevosDatos = {
    category: prompt("Nueva categoría:", producto.category) || producto.category,
    productName: prompt("Nuevo nombre:", producto.productName) || producto.productName,
    price: prompt("Nuevo precio:", producto.price) || producto.price,
    details: prompt("Nuevos detalles:", producto.details) || producto.details,
    ingredients: prompt("Nuevos ingredientes:", producto.ingredients) || producto.ingredients,
  };

  try {
    const response = await fetch(`/products/${producto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(nuevosDatos),
    });

    if (response.ok) {
      alert("Producto actualizado.");
      document.getElementById("productos").innerHTML = "";
      obtenerProductos();
    } else {
      alert("Error al actualizar el producto.");
    }
  } catch (err) {
    console.error("Error al editar el producto:", err);
    alert("Hubo un error.");
  }
}

document.addEventListener("DOMContentLoaded", obtenerProductos);
