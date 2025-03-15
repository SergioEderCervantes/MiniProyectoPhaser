var verifiedAlias;

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
        localStorage.setItem(alias, JSON.stringify(jugador));  // Guardar el jugador en localStorage

        // Guardar el alias como texto
        localStorage.setItem('verifiedAlias', alias);  // Guardamos solo el alias como texto

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

// Botón de Créditos
document.getElementById("btncreditos").addEventListener("click", function() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("creditos").style.display = "block";
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

    document.getElementById("registroForm").style.display = "none";  
    document.getElementById("tablaRegistros").style.display = "none";  
    document.getElementById("instrucciones").style.display = "none";  
    document.getElementById("creditos").style.display = "none";  
}

// Usar esta función en todos los botones que regresan al menú
document.getElementById("regresarMenu").addEventListener("click", regresarAlMenu);
document.getElementById("regresarMenuRegistros").addEventListener("click", regresarAlMenu);
document.getElementById("regresarMenuInstrucciones").addEventListener("click", regresarAlMenu);
document.getElementById("regresarMenuCreditos").addEventListener("click", regresarAlMenu);
