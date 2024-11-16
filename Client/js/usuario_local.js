// Función para mostrar el formulario de agregar producto
function mostrarFormulario() {
    document.getElementById("formularioProducto").style.display = "block";
}

// Función para ocultar el formulario de agregar producto
function ocultarFormulario() {
    document.getElementById("formularioProducto").style.display = "none";
}

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

    for (let i = 0; i < celdas.length - 1; i++) { // -1 para no incluir la columna de acciones
        const valorActual = celdas[i].innerText;
        celdas[i].innerHTML = `<input type="text" value="${valorActual}" />`;
    }

    button.innerText = "💾 Guardar";
    button.setAttribute("onclick", "guardarIngrediente(this)");
}

function guardarIngrediente(button) {
    const row = button.parentNode.parentNode;
    const celdas = row.getElementsByTagName("td");

    for (let i = 0; i < celdas.length - 1; i++) { // -1 para no incluir la columna de acciones
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

function eliminarProducto(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editarProducto(button) {
    const row = button.parentNode.parentNode;
    const celdas = row.getElementsByTagName("td");

    for (let i = 0; i < celdas.length - 1; i++) { // -1 para no incluir la columna de acciones
        const valorActual = celdas[i].innerText;
        celdas[i].innerHTML = `<input type="text" value="${valorActual}" />`;
    }

    button.innerText = "💾 Guardar";
    button.setAttribute("onclick", "guardarProducto(this)");
}

function guardarProducto(button) {
    const row = button.parentNode.parentNode;
    const celdas = row.getElementsByTagName("td");

    for (let i = 0; i < celdas.length - 1; i++) { // -1 para no incluir la columna de acciones
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
