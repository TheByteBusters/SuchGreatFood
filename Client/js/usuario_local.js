const userId = sessionStorage.getItem("userId");
sessionStorage.removeItem("userId");

// Función para mostrar el formulario de agregar producto
function mostrarFormulario() {
  document.getElementById("formularioProducto").style.display = "block";
}

// Función para ocultar el formulario de agregar producto
function ocultarFormulario() {
  document.getElementById("formularioProducto").style.display = "none";
}

<<<<<<< HEAD
// Función para agregar un nuevo producto
function agregarProducto() {
  // Obtener los valores de los campos de entrada
  const nombre = document.getElementById("nombreProducto").value;
  const precio = document.getElementById("precioProducto").value;
  const stock = document.getElementById("stockProducto").value;
  const extra = document.getElementById("extraProducto").value;

  // Crear una nueva fila en la tabla
  const tabla = document.getElementById("productos");
  const nuevaFila = tabla.insertRow();

  // Insertar celdas en la nueva fila
  const celdaNombre = nuevaFila.insertCell(0);
  const celdaPrecio = nuevaFila.insertCell(1);
  const celdaStock = nuevaFila.insertCell(2);
  const celdaExtra = nuevaFila.insertCell(3);
  const celdaAcciones = nuevaFila.insertCell(4);

  // Asignar los valores a las celdas
  celdaNombre.innerText = nombre;
  celdaPrecio.innerText = precio;
  celdaStock.innerText = stock;
  celdaExtra.innerText = extra;

  // Crear botones de editar y eliminar
  celdaAcciones.innerHTML = `
        <button onclick="editarProducto(this)">✏️ Editar</button>
        <button onclick="eliminarProducto(this)">❌ Eliminar</button>
    `;

  // Limpiar los campos de entrada
  document.getElementById("nombreProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("stockProducto").value = "";
  document.getElementById("extraProducto").value = "";

  // Ocultar el formulario después de agregar el producto
  ocultarFormulario();
}

// Función para eliminar un producto
function eliminarProducto(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

// Función para editar un producto
function editarProducto(button) {
  const row = button.parentNode.parentNode;
  const celdas = row.getElementsByTagName("td");

  for (let i = 0; i < celdas.length - 1; i++) {
    const valorActual = celdas[i].innerText;
    celdas[i].innerHTML = `<input type="text" value="${valorActual}" />`;
  }

  button.innerText = "💾 Guardar";
  button.setAttribute("onclick", "guardarProducto(this)");
}

// Función para guardar los cambios de un producto
function guardarProducto(button) {
  const row = button.parentNode.parentNode;
  const celdas = row.getElementsByTagName("td");

  for (let i = 0; i < celdas.length - 1; i++) {
    const input = celdas[i].getElementsByTagName("input")[0];
    celdas[i].innerText = input.value;
  }

  button.innerText = "✏️ Editar";
  button.setAttribute("onclick", "editarProducto(this)");
}

=======
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5
// Funciones para Ingredientes
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

  const celdaNombre = nuevaFila.insertCell(0);
  const celdaCantidad = nuevaFila.insertCell(1);
  const celdaPrecio = nuevaFila.insertCell(2);
  const celdaAcciones = nuevaFila.insertCell(3);

  celdaNombre.innerText = nombre;
  celdaCantidad.innerText = cantidad;
  celdaPrecio.innerText = precio;

  celdaAcciones.innerHTML = `
        <button onclick="editarIngrediente(this)">✏️ Editar</button>
        <button onclick="eliminarIngrediente(this)">❌ Eliminar</button>
    `;

  // Limpiar campos
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
    // -1 para no incluir la columna de acciones
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
    // -1 para no incluir la columna de acciones
    const input = celdas[i].getElementsByTagName("input")[0];
    celdas[i].innerText = input.value;
  }

  button.innerText = "✏️ Editar";
  button.setAttribute("onclick", "editarIngrediente(this)");
}

// Funciones para Productos
function mostrarFormularioProducto() {
  document.getElementById("formularioProducto").style.display = "block";
}

function ocultarFormularioProducto() {
  document.getElementById("formularioProducto").style.display = "none";
}

<<<<<<< HEAD
function agregarProducto() {
  const nombre = document.getElementById("nombreProducto").value;
  const ingredientes = document.getElementById("ingredientesProducto").value;
  const precio = document.getElementById("precioProducto").value;
  const cantidad = document.getElementById("cantidadProducto").value;

  const tabla = document.getElementById("productos");
  const nuevaFila = tabla.insertRow();

  const celdaNombre = nuevaFila.insertCell(0);
  const celdaIngredientes = nuevaFila.insertCell(1);
  const celdaPrecio = nuevaFila.insertCell(2);
  const celdaCantidad = nuevaFila.insertCell(3);
  const celdaAcciones = nuevaFila.insertCell(4);

  celdaNombre.innerText = nombre;
  celdaIngredientes.innerText = ingredientes;
  celdaPrecio.innerText = precio;
  celdaCantidad.innerText = cantidad;

  celdaAcciones.innerHTML = `
        <button onclick="editarProducto(this)">✏️ Editar</button>
        <button onclick="eliminarProducto(this)">❌ Eliminar</button>
    `;

  // Limpiar campos
  document.getElementById("nombreProducto").value = "";
  document.getElementById("ingredientesProducto").value = "";
  document.getElementById("precioProducto").value = "";
  document.getElementById("cantidadProducto").value = "";

  ocultarFormularioProducto();
}
=======
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5

function eliminarProducto(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function editarProducto(button) {
  const row = button.parentNode.parentNode;
  const celdas = row.getElementsByTagName("td");

  for (let i = 0; i < celdas.length - 1; i++) {
    // -1 para no incluir la columna de acciones
    const valorActual = celdas[i].innerText;
    celdas[i].innerHTML = `<input type="text" value="${valorActual}" />`;
  }

  button.innerText = "💾 Guardar";
  button.setAttribute("onclick", "guardarProducto(this)");
}

function guardarProducto(button) {
  const row = button.parentNode.parentNode;
  const celdas = row.getElementsByTagName("td");

  for (let i = 0; i < celdas.length - 1; i++) {
    // -1 para no incluir la columna de acciones
    const input = celdas[i].getElementsByTagName("input")[0];
    celdas[i].innerText = input.value;
  }

  button.innerText = "✏️ Editar";
  button.setAttribute("onclick", "editarProducto(this)");
}

// Función para cerrar sesión
function cerrarSesion() {
  alert("Has cerrado sesión."); // Mensaje de confirmación (opcional)
  window.location.href = "index.html";
}

<<<<<<< HEAD
document
  .getElementById("agregarProducto")
  .addEventListener("click", async () => {
    const nuevoProducto = {
      category: prompt("Categoría:"),
      productName: prompt("Nombre del producto:"),
      price: prompt("Precio:"),
      details: prompt("Detalles:"),
      ingredients: prompt("Ingredientes:"),
      img: prompt("URL de la imagen:"),
=======

async function agregarProductos() {


    const nuevoProducto = {
        category: document.getElementById("categoriaProducto").value,
        productName: document.getElementById("nombreProducto").value,
        price: document.getElementById("precioProducto").value,
        details: document.getElementById("detallesProducto").value,
        ingredients: document.getElementById("ingredientesProducto").value,
        img: document.getElementById("imagenProducto").value
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5
    };

    

    if (nuevoProducto.productName && nuevoProducto.price) {
      try {
        const response = await fetch("/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoProducto),
        });

<<<<<<< HEAD
        const data = await response.json();
        alert(data.message || "Producto agregado");
      } catch (error) {
        console.error(error);
        alert("Error al agregar el producto");
      }
=======
            const data = await response.json();
            alert(data.message || "Producto agregado");
            const tabla = document.getElementById("productos");
            tabla.innerHTML = "";

        } catch (error) {
            console.error(error);
            alert("Error al agregar el producto");
        }
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5
    } else {
      alert("El nombre y el precio son obligatorios.");
    }
<<<<<<< HEAD
  });
=======


    // Limpiar los campos de entrada
    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("ingredientesProducto").value = "";
    document.getElementById("detallesProducto").value = "";
    document.getElementById("imagenProducto").value = "";


    // Ocultar el formulario después de agregar el producto
    ocultarFormulario();
    obtenerProductos();
};
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5

async function obtenerProductos() {
  try {
    const response = await fetch("/products");
    const productos = await response.json();

<<<<<<< HEAD
    const contenedor = document.getElementById("productos-container");

    // Limpia el contenedor antes de agregar nuevos productos
    contenedor.innerHTML = "";

    productos.forEach((producto) => {
      const card = document.createElement("div");
      card.className = "card-productos";

      // Botón Eliminar
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "❌ Eliminar Producto";
      botonEliminar.addEventListener("click", () =>
        eliminarProducto(producto.id)
      );
      card.appendChild(botonEliminar);

      // Botón Editar
      const botonEditar = document.createElement("button");
      botonEditar.textContent = "✏️ Editar Producto";
      botonEditar.addEventListener("click", () => editarProducto(producto));
      card.appendChild(botonEditar);

      card.appendChild(document.createElement("br"));

      // Imagen del producto
      const imagen = document.createElement("img");
      imagen.src = producto.img || "https://via.placeholder.com/150";
      imagen.alt = producto.productName;
      imagen.width = 150;
      imagen.height = 150;
      card.appendChild(imagen);

      // Precio del producto
      const precio = document.createElement("p");
      precio.textContent = `PRECIO DEL PRODUCTO: $${producto.price}`;
      card.appendChild(precio);

      // Nombre del producto
      const nombre = document.createElement("p");
      nombre.textContent = `NOMBRE DEL PRODUCTO: ${producto.productName}`;
      card.appendChild(nombre);

      // Detalles del producto
      const detalles = document.createElement("p");
      detalles.textContent = `DETALLES DEL PRODUCTO: ${producto.details}`;
      card.appendChild(detalles);

      // Ingredientes del producto
      const ingredientes = document.createElement("p");
      ingredientes.textContent = `INGREDIENTES DEL PRODUCTO: ${producto.ingredients}`;
      card.appendChild(ingredientes);

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
=======

        productos.forEach(producto => {

            // Crear una nueva fila en la tabla
            const tabla = document.getElementById("productos");
            const nuevaFila = tabla.insertRow();

            // Insertar celdas en la nueva fila
            const celdaImagen = nuevaFila.insertCell(0);
            const celdaCategoria = nuevaFila.insertCell(1);
            const celdaNombre = nuevaFila.insertCell(2);
            const celdaPrecio = nuevaFila.insertCell(3);
            const celdaDetalles = nuevaFila.insertCell(4);
            const celdaIngredientes = nuevaFila.insertCell(5);
            const celdaAcciones = nuevaFila.insertCell(6);

            celdaAcciones.id = "celdaAcciones";

            // Asignar los valores a las celdas
            const imgSrc = producto.img ? producto.img : 'imagenes/Logo2.png';

            celdaImagen.innerHTML = `
                <img src="/imagenes/productos/${imgSrc}" width="150px" height="150px" onerror="this.src='imagenes/Logo2.png';"></img>
            `
            celdaCategoria.innerText = producto.category;
            celdaNombre.innerText = producto.productName;
            celdaPrecio.innerText = producto.price;
            celdaIngredientes.innerText = producto.ingredients;
            celdaDetalles.innerText = producto.details;
            

            // Botón Eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = '❌ Eliminar Producto';
            botonEliminar.addEventListener('click', () => eliminarProducto(producto.id));
            celdaAcciones.appendChild(botonEliminar);

            // Botón Editar
            const botonEditar = document.createElement('button');
            botonEditar.textContent = '✏️ Editar Producto';
            botonEditar.addEventListener('click', () => editarProducto(producto));
            celdaAcciones.appendChild(botonEditar);

            celdaAcciones.appendChild(document.createElement('br'));

           /*  // Imagen del producto
            const imagen = document.createElement('img');
            imagen.src = producto.img || 'https://via.placeholder.com/150';
            imagen.alt = producto.productName;
            imagen.width = 150;
            imagen.height = 150;
            card.appendChild(imagen); */

            
        
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5
}

// Función para eliminar producto
async function eliminarProducto(id) {
<<<<<<< HEAD
  if (confirm("¿Seguro que quieres eliminar este producto?")) {
    try {
      const response = await fetch(`/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      alert(data.message || "Producto eliminado");
      obtenerProductos(); // Refresca la lista de productos
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
=======


    if (confirm('¿Seguro que quieres eliminar este producto?')) {
        try {
            const response = await fetch(`/products/${id}`, {
                 method: 'DELETE',
                 headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}` 
                } });
            const data = await response.json();
            alert(data.message || 'Producto eliminado');
            const tabla = document.getElementById("productos");
            tabla.innerHTML = "";
            obtenerProductos();
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5
    }
  }
}

// Función para editar producto
async function editarProducto(producto) {
<<<<<<< HEAD
  // Capturar los datos actuales del producto y permitir al usuario editarlos
  const nuevosDatos = {
    category:
      prompt("Nueva categoría:", producto.category) || producto.category,
    productName:
      prompt("Nuevo nombre del producto:", producto.productName) ||
      producto.productName,
    price: prompt("Nuevo precio:", producto.price) || producto.price,
    details: prompt("Nuevos detalles:", producto.details) || producto.details,
    ingredients:
      prompt("Nuevos ingredientes:", producto.ingredients) ||
      producto.ingredients,
    img: prompt("Nueva URL de la imagen:", producto.img) || producto.img,
  };

  try {
    // Enviar los datos actualizados al backend
    const response = await fetch(`/products/${producto.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Incluye el token si es necesario
      },
      body: JSON.stringify(nuevosDatos),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message || "Producto actualizado correctamente.");
      // Opcional: Refrescar la lista de productos
      obtenerProductos();
    } else {
      const error = await response.json();
      alert(error.error || "Error al actualizar el producto.");
=======

    
     // Capturar los datos actuales del producto y permitir al usuario editarlos
     const nuevosDatos = {
        category: prompt("Nueva categoría:", producto.category) || producto.category,
        productName: prompt("Nuevo nombre del producto:", producto.productName) || producto.productName,
        price: prompt("Nuevo precio:", producto.price) || producto.price,
        details: prompt("Nuevos detalles:", producto.details) || producto.details,
        ingredients: prompt("Nuevos ingredientes:", producto.ingredients) || producto.ingredients,
        img: prompt("Nueva URL de la imagen:", producto.img) || producto.img,
    };

    try {
        // Enviar los datos actualizados al backend
        console.log("Producto id: " + producto.id);
        const response = await fetch(`/products/${producto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Incluye el token si es necesario
            },
            body: JSON.stringify(nuevosDatos),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || "Producto actualizado correctamente.");
            // Opcional: Refrescar la lista de productos
            const tabla = document.getElementById("productos");
            tabla.innerHTML = "";
            obtenerProductos();
        } else {
            const error = await response.json();
            alert(error.error || "Error al actualizar el producto.");
        }
    } catch (err) {
        console.error('Error al editar el producto:', err);
        alert("Hubo un error al intentar actualizar el producto.");
>>>>>>> 0a1db1f2b7181a9ffed41126663ebbfcfc57b1c5
    }
  } catch (err) {
    console.error("Error al editar el producto:", err);
    alert("Hubo un error al intentar actualizar el producto.");
  }
}



// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", obtenerProductos);
