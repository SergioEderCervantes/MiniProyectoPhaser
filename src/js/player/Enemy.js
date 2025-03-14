class Enemy extends AbsCharacter {
    constructor(scene, x, y, playerTarget) {
        super(scene, x, y, 'enemy');
        this.nombreTextura = 'enemy'
        this.leftAnim = 'enemy_left';
        this.rightAnim = 'enemy_right';
        this.turnAnim = 'enemy_turn';
        this.attackAnim = '';
        Enemy._createAnimations(scene);
        this.playerTarget = playerTarget;
        this.velocityX = 80;
        this.velocityY = -330;
    }

    static _createAnimations(scene){
        if (Enemy.animationsCreated) return;
        
        scene.anims.create({
            key: 'enemy_left',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'enemy_turn',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'enemy_right',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        Enemy.animationsCreated = true;
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
        // El +18 es un  ajuste por lo disparejo que estan los sprites cuando estan en el mismo lvl, verificar cuando se incluyan los demas sprites
        const playerY = this.playerTarget.y + 18;
        if (playerY < this.y && this.body.touching.down && Math.random() < 0.01){
            this._jump();
        }
    }
}