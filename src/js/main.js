document.getElementById("startGame").addEventListener("click", function () {
    // Ocultar el menú y el formulario de registro de jugador
    document.getElementById("menu").style.display = "none";
    document.getElementById("registroForm").style.display = "none";  // Asegúrate de ocultar el formulario de registro
    document.getElementById("gameContainer").style.display = "block";

    if (!document.getElementById("levelScript")) {
        const script = document.createElement("script");
        script.id = "levelScript";
        script.src = "js/Level1.js";
        script.onload = function () {
            if (typeof window.startGame === "function") {
                window.startGame();
            } else {
                console.error("Error: startGame no está definido después de cargar Level1.js.");
            }
        };
        document.body.appendChild(script);
    } else {
        window.startGame();
    }
});
