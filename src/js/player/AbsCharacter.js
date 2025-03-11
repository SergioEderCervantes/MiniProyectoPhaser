class AbsCharacter extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y, texture){
        super(scene, x, y, texture);
        
        // Añadir el sprite a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Configurar propiedades físicas
        this.setCollideWorldBounds(true);
        this.setBounce(0.02);
        
        
        this.velocityX = 160;
        this.velocityY = -330;
        this.nombreTextura = texture;
        this.leftAnim = "";
        this.rightAnim = "";
        this.turnAnim = "";

    }

    _createAnimations(){

    }

    _movRight(){
        this.setVelocityX(this.velocityX);
        this.anims.play(this.rightAnim, true);
    }

    _movLeft(){
        this.setVelocityX((this.velocityX * -1));
        this.anims.play(this.leftAnim,true);
    }

    _stop(){
        this.setVelocityX(0);
        this.anims.play(this.turnAnim);
    }

    _jump(){
        this.setVelocityY(this.velocityY);
    }

    _attack(){

    }


    handleMov() {
    }

}