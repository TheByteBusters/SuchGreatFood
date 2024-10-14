// Selecciona los botones por sus IDs
const loginButton = document.getElementById('loginBtn');
const registerButton = document.getElementById('registerBtn');

// Agrega el evento de clic para el botón de inicio de sesión
loginButton.addEventListener('click', () => {
  window.location.href = '../testing/testLogin.html'; // Cambia a la URL del formulario de inicio de sesión
});

// Agrega el evento de clic para el botón de registro
registerButton.addEventListener('click', () => {
  window.location.href = '../testing/testRegister.html'; // Cambia a la URL del formulario de registro
});
