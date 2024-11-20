// Función para verificar el token al cargar las páginas protegidas
function verifyToken() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    // Redirigir a la página de inicio de sesión si no hay token
    window.location.href = "../index.html"; // Cambia a la ruta correcta
  }
}

// Llamar a verifyToken en páginas protegidas
document.addEventListener("DOMContentLoaded", verifyToken);
