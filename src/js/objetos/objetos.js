class AbsObject extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        // Añadir el sprite a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    onCollect() {

    }
}


class Heart extends AbsObject {
    constructor(scene, x, y) {
        super(scene, x, y, 'heartObj');
        this.scene.physics.world.once("worldstep", () => {
            this.setBounce(0.3);
        });
        
    }

    onCollect() {
        // Quitarle un hit a la escena (una vida mas)
        if (this.scene.hits > 0) {
            this.scene.hits--;
        }
        // Updatear los corazones
        this.scene.updateHearts();
        // borrar el heart
        this.disableBody(true, true);
        this.destroy();
    }
}

class Gem extends AbsObject {
    constructor (scene, x, y){
        super(scene, x, y, 'gem');
        this.scene.physics.world.once("worldstep", () => {
            this.setBounce(0.5);
        });
        this.scene.anims.create({
            key: 'gemAnim',
            frames: this.scene.anims.generateFrameNumbers('gem', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.play('gemAnim');
        this.scene.time.delayedCall(10000, () => this.destroy());
        //Empezar el timer
        this.scene.startTimer();
    }

    onCollect(){
        // Incrementar el score por mucho
        this.scene.score += 800;
        this.scene.scoreText.setText('Score: ' + this.scene.score);

        // Desabilitar body
        this.disableBody(true, true);
        this.scene.timerText.setAlpha(0);
    }
}