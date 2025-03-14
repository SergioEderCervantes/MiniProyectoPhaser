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
        this.attackAnim = "";

    }

    _createAnimations(){

    }

    _movRight(dash = false){
        this.flipX = false;
        if(dash){
            this.setVelocityX(this.velocityX * 10);
            this.setAccelerationX(this.velocityX * -5);
            
        } else{
            this.setVelocityX(this.velocityX);
            this.anims.play(this.rightAnim, true);
            
        }
    }
    
    _movLeft(dash = false){
        this.flipX = true;
        if(dash){
            this.setVelocityX((this.velocityX * -10));
            this.setAccelerationX(this.velocityX * 5);
            
        } else{
            this.setVelocityX((this.velocityX * -1));
            this.anims.play(this.leftAnim,true);

        }
    }

    _stop(){
        this.setVelocityX(0);

        
            this.anims.play(this.turnAnim, true);
        
    }

    _jump(){
        this.setVelocityY(this.velocityY);
     
    }

    _attack(){
    }


    handleMov() {
    }

}