// Manejo del formulario de inicio de sesión
document.getElementById('contenedor-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita el envío tradicional del formulario
    console.log('Formulario de inicio de sesión enviado'); // Depuración

    // Obtención de valores del formulario
    const nombre_usuario = document.getElementById('nombre_usuario').value;
    const password = document.getElementById('password').value;

    console.log(`Datos del formulario: usuario=${nombre_usuario}, contraseña=${password}`); // Depuración

    // Envío de los datos al servidor para autenticar
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre_usuario, password })
    });

    const data = await response.json();
    console.log('Respuesta del servidor:', data); // Depuración

    // Manejo de la respuesta del servidor
    if (response.ok) {
        // Guarda el token y userId en localStorage
        localStorage.setItem('token', data.token); 
        localStorage.setItem('userId', data.userId); // Guarda el ID del usuario

        // Redirección según el tipo de usuario
        if (nombre_usuario === "hernan" && password === "1234") {
            window.location.href = './usuarioLocal.html'; // Redirige para el usuario local
        } else {
            window.location.href = './usuarios.html'; // Redirige para usuarios generales
        }
    } else {
        // Muestra el mensaje de error devuelto por el servidor
        alert('usuario o contraseña incorrecta...');
    }
});
