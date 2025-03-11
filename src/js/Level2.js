class Level2 extends Level1 {
    constructor() {
        super('Level2');
    }

    preload() {
        this.load.image('forest2', '../../assets/forest2.jpg');
    }

   
    _createWorld() {
        this.add.image(1590, 320, 'forest2');
        this.add.image(240, 320, 'forest2');
    }

    _createCamera(){

        this.cameras.main.setBounds(0, 0, 2610, window.innerHeight.toFixed(0));
        this.cameras.main.startFollow(this.player, true, 1, 1);
        this.cameras.main.fadeIn(2000, 0, 0, 0); // 1000ms de fade in desde negro

    }

}

