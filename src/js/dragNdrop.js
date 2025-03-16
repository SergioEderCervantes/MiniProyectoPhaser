const players = document.querySelectorAll(".sprite img");
const selected = document.getElementById("selected");
const playBtn = document.getElementById("playBtn");
var playerType = 0;
// Eventos de drag
if (players) {
    players.forEach(img => {
        img.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData("id", e.target.id);
        });
    });

}

// Eventos de drag target
if (selected) {
    selected.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    selected.addEventListener("drop", (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        console.log(id);
        const path = (id == 1) ? "../../assets/player/_Run.png" : "../../assets/player2/_Run.png"
        selected.style.backgroundImage = `url(${path})`;
        playerType = parseInt(id);
        // Activamos el boton principal
        playBtn.disabled = false;
    })
}
