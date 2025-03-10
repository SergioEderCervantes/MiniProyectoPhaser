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


}

