const mainBtn = document.getElementById("playBtn");
var verifiedAlias = "";
var playerType = 0;
if(mainBtn){
    mainBtn.addEventListener("click", function () {
        let alias = document.getElementById("aliasInput").value.trim();

        if(verifyAlias(alias)){
            verifiedAlias = alias;
            // Ocultar el menú y el formulario de registro de jugador
            document.getElementById("menu").style.display = "none";
            document.getElementById("seleccionarJugador").style.display = "none";  
            document.querySelector("body").style.overflow = "hidden";  

            window.startGame();
        } else{
            mainBtn.disabled = true;
            document.getElementById("selected").style.backgroundImage = ""
        }
    });
}

function verifyAlias(alias) {
   
    let aliasRegex = /^[a-zA-Z0-9_]{4,8}$/;

    if (!aliasRegex.test(alias)) {
        Swal.fire({
            icon: "error",
            title: "Alias inválido",
            text: "El alias debe tener entre 4 y 8 caracteres y solo puede contener letras, números y '_'.",
        });
        return false;
    }

    if (localStorage.getItem(alias)) {
        Swal.fire({
            icon: "warning",
            title: "Alias ya registrado",
            text: "Este alias ya existe.",
        });
        return true;
    } else {
        let jugador = {
            alias: alias,
            puntuacion: 0,
            fecha: new Date().toLocaleDateString()
        };
        localStorage.setItem(alias, JSON.stringify(jugador));  // Guardar el jugador en localStorage

        Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: `El alias "${alias}" ha sido registrado correctamente.`,
        });

        document.getElementById("aliasInput").value = "";
        verifiedAlias = alias;
        return true;
    }
}