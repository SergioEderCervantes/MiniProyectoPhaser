class Enemy extends AbsCharacter {
    constructor(scene, x, y, playerTarget) {
        super(scene, x, y, 'eIdle');
        this.nombreTextura = 'eIdle'
        this.leftAnim = 'enemy_left';
        this.rightAnim = 'enemy_right';
        this.turnAnim = 'enemy_turn';
        this.attackAnim = 'enemy_attack';
        Enemy._createAnimations(scene);
        this.playerTarget = playerTarget;
        this.velocityX = 80;
        this.velocityY = -330;
        this.isAttacking = false;
        this.isDying = false;
    }

    static _createAnimations(scene){
        if (Enemy.animationsCreated) return;
        
        scene.anims.create({
            key: 'enemy_left',
            frames: scene.anims.generateFrameNumbers('eWalk', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'enemy_turn',
            frames: scene.anims.generateFrameNumbers('eIdle', { start: 0, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'enemy_right',
            frames: scene.anims.generateFrameNumbers('eWalk', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'enemy_attack',
            frames: scene.anims.generateFrameNumbers('eAttack', { start: 0, end: 17 }),
            frameRate: 30,
            repeat: 0,
        });
        scene.anims.create({
            key: 'enemy_dead',
            frames: scene.anims.generateFrameNumbers('eDead', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: 0
        });

        Enemy.animationsCreated = true;
    }

    handleMov(){
        if (this.isAttacking || this.isDying) return;
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
    attack() {
        if (this.isAttacking ) return; // Evita spameo de ataques
    
        this.isAttacking = true;
        const originalY = this.y;
        
        this.y -= 10;
        this.anims.play(this.attackAnim, true);
    
        this.once('animationcomplete', () => {
            this.y = originalY;
            this.isAttacking = false;
        });
    }

    die(){
        this.isDying = true;
        this.setVelocityX(0);
        this.anims.play('enemy_dead', true);
        this.once('animationcomplete', (anim) => {
            if (anim.key !== 'enemy_dead') return;
            this.disableBody(false, false);
            // Crear una estrella nueva
            const star = this.scene.physics.add.sprite(this.x, this.y, 'star');
            this.scene.stars.add(star);
            star.setBounce(1);
            // this.destroy();
            
        })
    }
    
}