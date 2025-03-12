
var config = {
    type: Phaser.AUTO,
    width: 2200,
    height: 620,

    // Physics support
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [new Level1('Level1'), new Level2('Level2')]
};

var game = new Phaser.Game(config);