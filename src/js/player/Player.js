class Player extends AbsCharacter {
    constructor(scene, x, y){
        super(scene, x, y, 'dude');
        this.nombreTextura = 'dude';
        this.leftAnim = 'left';
        this.rightAnim = 'right';
        this.turnAnim = 'turn';
        this._createAnimations();
        
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
            frames: [{ key: this.nombreTextura, frame: 4 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: this.rightAnim,
            frames: this.scene.anims.generateFrameNumbers(this.nombreTextura, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
    handleMov(cursors) {
        if (cursors.left.isDown) {
            this._movLeft();
        }else if (cursors.right.isDown) {
            this._movRight();
        }
        else {
            this._stop();
        }
        
        if (cursors.up.isDown && this.body.touching.down) {
            this._jump();
        }
    }
}
