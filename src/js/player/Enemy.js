class Enemy extends AbsCharacter {
    constructor(scene, x, y, playerTarget) {
        super(scene, x, y, 'enemy');
        this.nombreTextura = 'enemy'
        this.leftAnim = 'enemy_left';
        this.rightAnim = 'enemy_right';
        this.turnAnim = 'enemy_turn';
        this.attackAnim = '';
        this.dashAnim = '';
        this._createAnimations();
        
        this.playerTarget = playerTarget;
        this.velocityX = 80;
        this.velocityY = -330;
    }

    _createAnimations(){
        this.scene.anims.create({
            key: this.leftAnim,
            frames: this.scene.anims.generateFrameNumbers(this.nombreTextura, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: this.turnAnim,
            frames: this.scene.anims.generateFrameNumbers(this.nombreTextura, { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: this.rightAnim,
            frames: this.scene.anims.generateFrameNumbers(this.nombreTextura, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

    handleMov(){
        const playerX = this.playerTarget.x;
        const gap = 16;

        if (Math.abs(playerX - this.x) < gap){
            this._stop();
        } else if (playerX < this.x){
            this._movLeft();
        } else {    
            this._movRight();
        }
        // Jump mechanics 
        const playerY = this.playerTarget.y;
        if (playerY < this.y && this.body.touching.down && Math.random() < 0.01){
            this._jump();
        }
    }
}