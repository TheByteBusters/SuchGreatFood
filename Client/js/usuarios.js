document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const name = form.elements["name"].value;
        const email = form.elements["email"].value;
        const message = form.elements["message"].value;
        const userId = localStorage.getItem("userId"); // Obtiene el userId de localStorage

        if (!userId) {
            alert('Error: No has iniciado sesión.');
            return;
        }

        try {
            const response = await fetch('/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message, userId })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                form.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.');
        }
    });
});
