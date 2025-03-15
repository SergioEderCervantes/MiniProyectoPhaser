class Structure {
    constructor(scene, x, y, group, relImage) {
        this.health = 3; // La estructura puede recibir 3 ataques antes de ser destruida
        this.sprite = scene.add.sprite(x, y, 'spawn'); // Crear el sprite en la escena
        group.add(this.sprite); // Agregar el sprite al grupo estático
        this.relImage = relImage
        scene.physics.add.existing(this.sprite, true); // Convierte el sprite en un objeto estático
 
    }


    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.destroyStructure();
        }
    }

    destroyStructure() {
        //this.spawnEvent.remove();
        this.relImage.setAlpha(0);
        this.sprite.destroy();
    }
}

