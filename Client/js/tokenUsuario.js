document.getElementById('logout').addEventListener('click', () => {
    sessionStorage.removeItem('token'); // Elimina el token
    window.location.href = './index.html'; // Redirige a la página de inicio de sesión
});
