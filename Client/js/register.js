window.addEventListener("load", () => {
  setTimeout(() => {
    const pantallaNegra = document.getElementById("pantalla-negra");
    pantallaNegra.style.transition = "opacity 0.5s ease"; // Suaviza la desaparición
    pantallaNegra.style.opacity = "0"; // Oculta visualmente

    // Oculta el elemento después de la transición
    setTimeout(() => {
      pantallaNegra.style.display = "none";
    }, 100); // Tiempo de la transición
  }, 300); // Espera 3 segundos
});

// register.js
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message); // Mostrar el mensaje de éxito o error
      } catch (error) {
        console.error("Error al registrar:", error);
        alert("Ocurrió un error al procesar tu solicitud.");
      }
    });
  }
});
