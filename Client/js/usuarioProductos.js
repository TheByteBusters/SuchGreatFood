const renderMenu = (menuType) => {
    const productContainer = document.querySelector('.card-lista-productos');
    productContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

    if (productContainer && menus[menuType]) {
        menus[menuType].forEach(product => {
            const productCard = `
                <div class="card-productos">
                    <img src="${product.img}" width="150px" height="150px" alt="${product.productName}">
                    <p>PRECIO DEL PRODUCTO: $${product.price}</p>
                    <p>NOMBRE DEL PRODUCTO: ${product.productName}</p>
                    <p>DETALLES DEL PRODUCTO: ${product.details}</p>
                    <p>INGREDIENTES DEL PRODUCTO:</p>
                    <ul>//
                        ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            `;
            productContainer.innerHTML += productCard;
        });
    } else {
        console.error('Menú no encontrado o contenedor de productos no disponible');
    }
};

//document.addEventListener("DOMContentLoaded", () => {
//    // Renderizar el menú de lomos por defecto al cargar la página
//    renderMenu('lomos');
//});
