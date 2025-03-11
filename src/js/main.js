
var config = {
    type: Phaser.AUTO,
    width: 2200,
    height: 720,

    // Physics support
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [new Level1('Level1'), new Level2()]
};

var game = new Phaser.Game(config);