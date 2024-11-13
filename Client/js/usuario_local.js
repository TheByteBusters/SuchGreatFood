// script.js

// Función para agregar un nuevo producto a la tabla
function agregarIngredientes() {
    // Obtener valores del usuario
    const ingrediente = prompt("Ingrese el ingrediente:");
    const precio = prompt("Ingrese el precio:");
    const stock = prompt("Ingrese el stock:");
    const extra = prompt("Ingrese un dato adicional:");

    // Verificar que todos los campos hayan sido llenados
    if (ingrediente && precio && stock && extra) {
        // Crear una nueva fila
        const tabla = document.querySelector(".tabla-ingredientes tbody");
        const nuevaFila = document.createElement("tr");

        // Crear y añadir las celdas con los datos
        nuevaFila.innerHTML = `
            <td>${ingrediente}</td>
            <td>${precio}</td>
            <td>${stock}</td>
            <td>${extra}</td>
        `;

        // Añadir la nueva fila a la tabla
        tabla.appendChild(nuevaFila);
    } else {
        alert("Todos los campos son obligatorios.");
    }
}
