document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('#nav ul');
    let isMenuOpen = false;

    // Función para abrir/cerrar el menú
    function toggleMenu(event) {
        event.stopPropagation();
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }

    // Event listener para el botón de menú
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar el menú cuando se hace clic en icono
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            isMenuOpen = false;
        });
    });

    // Cerrar el menú cuando se hace clic fuera o en el icono
    document.addEventListener('click', (event) => {
        if (isMenuOpen && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            isMenuOpen = false;
        }
    });
}); 