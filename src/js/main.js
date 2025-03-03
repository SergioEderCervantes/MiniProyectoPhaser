var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // Physics support
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Level1]
};

var game = new Phaser.Game(config);