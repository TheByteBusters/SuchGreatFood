async function login() {
    const username = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre_usuario: username, password: password }),
    });

    const data = await response.json();
    
    if (response.ok) {
        // Almacenar el token en sessionStorage
        sessionStorage.setItem('token', data.token);
        window.location.href = './usuarios.html';
    } else {
        alert(data.message); // Mostrar mensaje de error
    }
}

// Función para verificar el token al cargar las páginas protegidas
function verifyToken() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        // Redirigir a la página de inicio de sesión si no hay token
        window.location.href = '../index.html'; // Cambia a la ruta correcta
    }
}

// Llamar a verifyToken en páginas protegidas
document.addEventListener('DOMContentLoaded', verifyToken);
