document.getElementById("btnJugador").addEventListener("click", function() {
    document.getElementById("menu").style.display = "none";  
    document.getElementById("registroForm").style.display = "block";  
    document.getElementById("tablaRegistros").style.display = "none";  
});

document.getElementById("btnRegistros").addEventListener("click", function() {
    document.getElementById("menu").style.display = "none";  
    document.getElementById("tablaRegistros").style.display = "block";  
    document.getElementById("registroForm").style.display = "none";  
});

document.getElementById("btnSalir").addEventListener("click", function() {
    window.close();  // Esto cierra la ventana del navegador (esto solo funciona en algunas circunstancias)
});

document.getElementById("regresarMenu").addEventListener("click", function() {
    document.getElementById("menu").style.display = "block";  
    document.getElementById("registroForm").style.display = "none";  
    document.getElementById("tablaRegistros").style.display = "none";  
});  // <-- Paréntesis de cierre que faltaba

document.getElementById("regresarMenuRegistros").addEventListener("click", function() {
    document.getElementById("menu").style.display = "block";  
    document.getElementById("registroForm").style.display = "none";  
    document.getElementById("tablaRegistros").style.display = "none";  
});

document.getElementById("registrarAlias").addEventListener("click", function() {
    let alias = document.getElementById("aliasInput").value.trim();
    let aliasRegex = /^[a-zA-Z0-9_]{4,8}$/;

    if (!aliasRegex.test(alias)) {
        Swal.fire({
            icon: "error",
            title: "Alias inválido",
            text: "El alias debe tener entre 4 y 8 caracteres y solo puede contener letras, números y '_'.",
        });
        return;
    }

    if (localStorage.getItem(alias)) {
        Swal.fire({
            icon: "warning",
            title: "Alias ya registrado",
            text: "Este alias ya existe. Intenta con otro.",
        });
    } else {
        let jugador = {
            alias: alias,
            puntuacion: 0,
            fecha: new Date().toLocaleDateString()
        };
        localStorage.setItem(alias, JSON.stringify(jugador));

        Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: `El alias "${alias}" ha sido registrado correctamente.`,
        });

        document.getElementById("aliasInput").value = ""; 
        document.getElementById("startGame").disabled = false;  // Habilitar el botón de jugar
    }
});

// Mostrar registros
document.getElementById("btnRegistros").addEventListener("click", function() {
    let tablaBody = document.getElementById("tablaBody");
    tablaBody.innerHTML = ""; // Limpiar la tabla

    let jugadores = [];

    for (let i = 0; i < localStorage.length; i++) {
        let alias = localStorage.key(i);
        let data = localStorage.getItem(alias);
        
        try {
            let jugador = JSON.parse(data); // Convertir a objeto JSON
            if (jugador && jugador.puntuacion !== undefined) {
                jugadores.push(jugador);
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
            <td>${jugador.puntuacion}</td>
            <td>${jugador.fecha}</td>
        </tr>`;
        tablaBody.innerHTML += fila;
    });
});

