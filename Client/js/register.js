// register.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
  
          const result = await response.json();
          alert(result.message);  // Mostrar el mensaje de éxito o error
        } catch (error) {
          console.error('Error al registrar:', error);
          alert('Ocurrió un error al procesar tu solicitud.');
        }
      });
    }
  });
  