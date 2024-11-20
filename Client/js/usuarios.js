document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const userId = sessionStorage.getItem("userId");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("token");

  const logout = document.getElementById("logout");

  // cerrar sesión
  logout.addEventListener("click", () => {
    window.location.href = "./index.html";
  });

  setTimeout(() => {
    const pantallaNegra = document.getElementById("pantalla-negra");
    pantallaNegra.style.transition = "opacity 0.5s ease"; // Suaviza la desaparición
    pantallaNegra.style.opacity = "0"; // Oculta visualmente

    // Oculta el elemento después de la transición
    setTimeout(() => {
      pantallaNegra.style.display = "none";
    }, 1500); // Tiempo de la transición
  }, 3000); // Espera 3 segundos

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const message = form.elements["message"].value;

    if (!userId) {
      alert("Error: No has iniciado sesión.");
      return;
    }

    try {
      const response = await fetch("/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, userId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        form.reset();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      alert(
        "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde."
      );
    }
  });
});
