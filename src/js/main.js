var config = {
    type: Phaser.AUTO,
    width: 2200,
    height: 710,

    // Physics support
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Level1]
};

var game = new Phaser.Game(config);