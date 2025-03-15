
document.getElementById("btnJugador").addEventListener("click", function () {
    document.getElementById("menu").style.display = "none";
    document.getElementById("seleccionarJugador").style.display = "block";
    document.getElementById("tablaRegistros").style.display = "none";
});

document.getElementById("btnRegistros").addEventListener("click", function () {
    document.getElementById("menu").style.display = "none";
    document.getElementById("tablaRegistros").style.display = "block";
    document.getElementById("seleccionarJugador").style.display = "none";
});

document.getElementById("btnSalir").addEventListener("click", function () {
    window.close();  // Esto cierra la ventana del navegador (esto solo funciona en algunas circunstancias)
});

document.getElementById("regresarMenu").addEventListener("click", function () {
    document.getElementById("menu").style.display = "block";
    document.getElementById("seleccionarJugador").style.display = "none";
    document.getElementById("tablaRegistros").style.display = "none";
});  

document.getElementById("regresarMenuRegistros").addEventListener("click", function () {
    document.getElementById("menu").style.display = "block";
    document.getElementById("seleccionarJugador").style.display = "none";
    document.getElementById("tablaRegistros").style.display = "none";
});


// Mostrar registros
document.getElementById("btnRegistros").addEventListener("click", function () {
    let tablaBody = document.getElementById("tablaBody");
    tablaBody.innerHTML = ""; // Limpiar la tabla

    let jugadores = [];

    for (let i = 0; i < localStorage.length; i++) {
        let alias = localStorage.key(i);
        let data = localStorage.getItem(alias);

        try {
            let jugador = JSON.parse(data); // Convertir a objeto JSON
            if (jugador && jugador.puntuacion !== undefined) {
                jugadores.push(jugador);  // Asegúrate de agregar a los jugadores con puntaje
            }
        } catch (error) {
            console.error(`Error al leer alias: ${alias}`, error);
        }
    }

    if (jugadores.length === 0) {
        Swal.fire({
            icon: "info",
            title: "No hay jugadores registrados",
            text: "Registra un alias primero.",
        });
        document.getElementById("tablaRegistros").style.display = "none";
        return;
    }

    // Ordenar por puntuación (de mayor a menor)
    jugadores.sort((a, b) => b.puntuacion - a.puntuacion);

    // Agregar filas a la tabla
    jugadores.forEach(jugador => {
        let fila = `<tr>
            <td>${jugador.alias}</td>
            <td>${jugador.puntuacion}</td>  <!-- Mostrar el puntaje aquí -->
            <td>${jugador.fecha}</td>
        </tr>`;
        tablaBody.innerHTML += fila;
    });
});


// Botón de Instrucciones
document.getElementById("btninstr").addEventListener("click", function() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("instrucciones").style.display = "block";
});

// Regresar desde Instrucciones
document.getElementById("regresarMenuInstrucciones").addEventListener("click", function() {
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("menu").style.display = "block";
});

// Regresar desde Créditos
document.getElementById("regresarMenuCreditos").addEventListener("click", function() {
    document.getElementById("creditos").style.display = "none";
    document.getElementById("menu").style.display = "block";
});



function regresarAlMenu() {
    let menu = document.getElementById("menu");
    menu.style.display = "flex";  
    menu.style.flexDirection = "column";  // Mantener alineación vertical
    menu.style.alignItems = "center";  
    menu.style.justifyContent = "center";  

    document.getElementById("seleccionarJugador").style.display = "none";  
    document.getElementById("tablaRegistros").style.display = "none";  
    document.getElementById("instrucciones").style.display = "none";  
    document.getElementById("creditos").style.display = "none";  
}

// Usar esta función en todos los botones que regresan al menú
document.getElementById("regresarMenu").addEventListener("click", regresarAlMenu);
document.getElementById("regresarMenuRegistros").addEventListener("click", regresarAlMenu);
document.getElementById("regresarMenuInstrucciones").addEventListener("click", regresarAlMenu);
document.getElementById("regresarMenuCreditos").addEventListener("click", regresarAlMenu);
document.getElementById("btnCreditos").addEventListener("click", function () {
    document.getElementById("menu").style.display = "none";
    document.getElementById("tablaRegistros").style.display = "none";
    document.getElementById("seleccionarJugador").style.display = "none";
    
    const canvas = document.getElementById('creditsCanvas');
    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");

    const date = new Date().toLocaleDateString();
    const texts = [
        "Universidad Autónoma de Aguascalientes",
        "Materia de Tecnologías Web",
        "Maestra: Georgina Salazar Partida",
        "Daan Jostin Carabez García",
        "Sergio Eder Cervantes Rincón",
        "Eduardo Said Guerrero Rico",
        date
    ];

    let positions = texts.map((_, i) => canvas.height + i * 100);

    function drawCredits() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";

        positions.forEach((y, i) => {
            ctx.fillText(texts[i], canvas.width / 2, y);
            positions[i] -= 0.5; 
        });

        if (positions[positions.length - 1] < -50) {
            positions = texts.map((_, i) => canvas.height + i * 100);
        }

        requestAnimationFrame(drawCredits);
    }

    drawCredits(); // Iniciar animación
});
