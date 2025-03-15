class structure extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.health = 3; // La estructura puede recibir 3 ataques antes de ser destruida
        this.spawnPoints = [
            { x: 70, y: 210 },
            { x: 1197, y: 140 },
            { x: 1520, y: 535 },
        ];
    }

 
    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.destroyStructure();
        }
    }

    destroyStructure() {
        //this.spawnEvent.remove();
        this.destroy();
    }
}

