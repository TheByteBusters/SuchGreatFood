// productos.js

let allProducts = []; // Variable para almacenar todos los productos

// Función para obtener productos desde la API
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:8080/products'); // URL de tu API
        if (!response.ok) throw new Error('Error al obtener productos');

        allProducts = await response.json(); // Almacenar todos los productos
        displayProducts(allProducts); // Mostrar todos los productos al cargar la página
    } catch (error) {
        console.error(error);
    }
}

// Función para mostrar los productos en el HTML
function displayProducts(products) {
    const container = document.getElementById('productos-container');
    container.innerHTML = ''; // Limpiar contenido previo

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.img}" alt="${product.productName}" />
            <div class="product-info">
                <h4>${product.productName}</h4>
                <p class="price">$${product.price}</p>
                <p class="ingredients">Ingredientes: ${product.ingredients}</p>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Función para filtrar productos según la categoría seleccionada
function renderMenu(category) {
    if (category === 'todos') {
        displayProducts(allProducts); // Muestra todos los productos
    } else {
        const filteredProducts = allProducts.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Llamar a la función al cargar la página
window.onload = fetchProducts;
