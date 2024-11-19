let allProducts = []; // Variable para almacenar todos los productos
const cart = []; // Array para el carrito

// Función para obtener productos desde la API
async function fetchProducts() {
    try {
        console.log("Fetching products from API...");
        const response = await fetch('http://localhost:8080/products'); // URL de tu API
        if (!response.ok) throw new Error('Error al obtener productos');

        allProducts = await response.json(); // Almacenar todos los productos
        console.log("Products fetched successfully:", allProducts);
        displayProducts(allProducts); // Mostrar todos los productos al cargar la página
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

// Función para mostrar los productos en el HTML con opción de agregar al carrito
function displayProducts(products) {
    const container = document.getElementById('productos-container');
    container.innerHTML = ''; // Limpiar contenido previo
    console.log("Displaying products...");

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const defaultImg = "../imagenes/logo.jpg"; // Ruta de la imagen por defecto
        const productImg = product.img ? product.img : defaultImg;

        productCard.innerHTML = `
            <img src="${productImg}" alt="${product.productName}" />
            <div class="product-info">
                <h4>${product.productName}</h4>
                <p class="price">$${product.price}</p>
                <p class="ingredients">Ingredientes: ${product.ingredients}</p>
            </div>
        `;

        const buyButton = document.createElement("button");
        buyButton.innerText = "Buy";
        productCard.appendChild(buyButton);

        // Agregar evento de clic para añadir al carrito
        buyButton.addEventListener("click", () => {
            console.log(`Adding product to cart: ${product.productName}`);
            const repeat = cart.some(repeatProduct => repeatProduct.id === product.id);

            if (repeat) {
                cart.forEach(prod => {
                    if (prod.id === product.id) {
                        prod.quanty++;
                        console.log(`Incremented quantity of ${prod.productName} in cart to ${prod.quanty}`);
                        displayCartCounterIndex();
                    }
                });
            } else {
                cart.push({
                    id: product.id,
                    productName: product.productName,
                    price: product.price,
                    quanty: 1, // Inicializamos con cantidad 1
                    img: product.img
                });
                console.log(`Product added to cart:`, product);
                displayCartCounterIndex();
            }
            console.log("Current cart:", cart);
        });

        container.appendChild(productCard);
    });
}

// Función para actualizar el contador de productos en el carrito
function displayCartCounterIndex() {
    const cartCounter = document.getElementById("cart-counter");
    const totalItems = cart.reduce((acc, product) => acc + product.quanty, 0);
    cartCounter.innerText = totalItems;
    console.log("Updated cart counter:", totalItems);
}

// Función para filtrar productos según la categoría seleccionada
function renderMenu(category) {
    console.log(`Filtering products by category: ${category}`);
    if (category === 'todos') {
        displayProducts(allProducts); // Muestra todos los productos
    } else {
        const filteredProducts = allProducts.filter(product => product.category === category);
        displayProducts(filteredProducts);
        console.log(`Displayed ${filteredProducts.length} products for category: ${category}`);
    }
}



// Llamar a la función al cargar la página
window.onload = fetchProducts;
