window.addEventListener("load", () => {
  setTimeout(() => {
    const pantallaNegra = document.getElementById("pantalla-negra");
    pantallaNegra.style.transition = "opacity 0.5s ease"; // Suaviza la desaparición
    pantallaNegra.style.opacity = "0"; // Oculta visualmente

    // Oculta el elemento después de la transición
    setTimeout(() => {
      pantallaNegra.style.display = "none";
    }, 100); // Tiempo de la transición
  }, 200); // Espera 3 segundos
});

// Selecciona los botones por sus IDs
const loginButton = document.getElementById("loginBtn");
const registerButton = document.getElementById("registerBtn");

// Agrega el evento de clic para el botón de inicio de sesión
loginButton.addEventListener("click", () => {
  window.location.href = "./formLogin.html"; // Cambia a la URL del formulario de inicio de sesión
});

// Agrega el evento de clic para el botón de registro
registerButton.addEventListener("click", () => {
  window.location.href = "./formRegister.html"; // Cambia a la URL del formulario de registro
});
