// script.js
const token = sessionStorage.getItem('token');
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


document.getElementById("agregarProducto").addEventListener("click", async () => {
    const nuevoProducto = {
        category: prompt("Categoría:"),
        productName: prompt("Nombre del producto:"),
        price: prompt("Precio:"),
        details: prompt("Detalles:"),
        ingredients: prompt("Ingredientes:"),
        img: prompt("URL de la imagen:")
    };

    if (nuevoProducto.productName && nuevoProducto.price) {
        try {
            const response = await fetch('/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto),
            });

            const data = await response.json();
            alert(data.message || "Producto agregado");
        } catch (error) {
            console.error(error);
            alert("Error al agregar el producto");
        }
    } else {
        alert("El nombre y el precio son obligatorios.");
    }
});

async function obtenerProductos() {
    try {
        const response = await fetch('/products'); 
        const productos = await response.json();

        const contenedor = document.getElementById("productos-container"); 

        // Limpia el contenedor antes de agregar nuevos productos
        contenedor.innerHTML = '';

        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'card-productos';

            // Botón Eliminar
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = '❌ Eliminar Producto';
            botonEliminar.addEventListener('click', () => eliminarProducto(producto.id));
            card.appendChild(botonEliminar);

            // Botón Editar
            const botonEditar = document.createElement('button');
            botonEditar.textContent = '✏️ Editar Producto';
            botonEditar.addEventListener('click', () => editarProducto(producto));
            card.appendChild(botonEditar);

            card.appendChild(document.createElement('br'));

            // Imagen del producto
            const imagen = document.createElement('img');
            imagen.src = producto.img || 'https://via.placeholder.com/150';
            imagen.alt = producto.productName;
            imagen.width = 150;
            imagen.height = 150;
            card.appendChild(imagen);

            // Precio del producto
            const precio = document.createElement('p');
            precio.textContent = `PRECIO DEL PRODUCTO: $${producto.price}`;
            card.appendChild(precio);

            // Nombre del producto
            const nombre = document.createElement('p');
            nombre.textContent = `NOMBRE DEL PRODUCTO: ${producto.productName}`;
            card.appendChild(nombre);

            // Detalles del producto
            const detalles = document.createElement('p');
            detalles.textContent = `DETALLES DEL PRODUCTO: ${producto.details}`;
            card.appendChild(detalles);

            // Ingredientes del producto
            const ingredientes = document.createElement('p');
            ingredientes.textContent = `INGREDIENTES DEL PRODUCTO: ${producto.ingredients}`;
            card.appendChild(ingredientes);

            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para eliminar producto
async function eliminarProducto(id) {
    if (confirm('¿Seguro que quieres eliminar este producto?')) {
        try {
            const response = await fetch(`/products/${id}`, {
                 method: 'DELETE',
                 headers: {
                    'Authorization': `Bearer ${token}` 
                } });
            const data = await response.json();
            alert(data.message || 'Producto eliminado');
            obtenerProductos(); // Refresca la lista de productos
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    }
}

// Función para editar producto
async function editarProducto(producto) {
    
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
        const response = await fetch(`/products/${producto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Incluye el token si es necesario
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
        }
    } catch (err) {
        console.error('Error al editar el producto:', err);
        alert("Hubo un error al intentar actualizar el producto.");
    }
    
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerProductos);

