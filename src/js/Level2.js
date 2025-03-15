class Level2 extends Level1 {
    constructor(key = "Level2") {
        super(key);
        this.color = 0xffffff;
        this.textColor = '#ffffff';
    }

    preload() {
        this.load.image('forest3', '../../assets/forest3.jpg');
        this.load.image('layer2.1', '../../assets/parallax_bg_lvl2/background_layer_1.png');
        this.load.image('layer2.2', '../../assets/parallax_bg_lvl2/background_layer_2.png');
        this.load.image('layer2.3', '../../assets/parallax_bg_lvl2/background_layer_3.png');

    }

    create(data){
        super.create();
        if(data){
            this.hits = data.hits;
            this.score = data.score;
            console.log(`Recibido: Vida = ${this.hits}, Puntuación = ${this.score}`);
            this.scoreText.setText('Score: ' + this.score);
            this._updateHearts();
        }
    }

    _cretatePlatforms() {
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 400, 'platform').setScale(3).refreshBody();
        this.platforms.create(800, 400, 'platform').setScale(3).refreshBody();
        this.platforms.create(50, 250, 'platform').setScale(3).refreshBody();
        this.platforms.create(750, 220, 'platform').setScale(3).refreshBody();
        this.platforms.create(150, 450, 'platform').setScale(3).refreshBody();
        this.platforms.create(1900, 200, 'platform').setScale(3).refreshBody();
        this.platforms.create(1600, 300, 'platform').setScale(3).refreshBody();
        this.platforms.create(1200, 100, 'platform').setScale(3).refreshBody();
        this.platforms.create(1190, 425, 'platform').setScale(3).refreshBody();
        this.platforms.create(1260, 425, 'platform').setScale(3).refreshBody();
        this.platforms.create(1926.5, 365, 'platformw').setScale(3).refreshBody();
        this.platforms.create(1910, 125, 'wall').flipX = true;
        this.platforms.create(1915, 500, 'rocks');

        this.add.image(1880, 525, 'back');
    
    }
    _createWorld() {
        // this.add.image(1590, 220, 'forest3');
        // this.add.image(240, 220, 'forest3');
        this.add.image(551,310,'layer2.1').setScrollFactor(0);
        this.add.image(1653,310,'layer2.1').setScrollFactor(0);
        
        this.add.image(551,310,'layer2.2').setScrollFactor(0.4);
        this.add.image(1653,310,'layer2.2').setScrollFactor(0.4);
        
        this.add.image(551,310,'layer2.3').setScrollFactor(0.8);
        this.add.image(1653,310,'layer2.3').setScrollFactor(0.8);
        
        this.add.image(620,300,'layer5').setScrollFactor(0.8);
        this.add.image(1860,300,'layer5').setScrollFactor(0.8);
        
        this.add.image(1860,300,'layer6').setScrollFactor(1);
        this.add.image(620,300,'layer6').setScrollFactor(1);
    }

    _createCamera() {
        // Se setea la camara principal para que siga al jugador y marca los limites del mapa en la camara
        this.cameras.main.setBounds(0, 0, 2610, 600);
        this.cameras.main.startFollow(this.player, true, 1, 1);
        this.cameras.main.fadeIn(2000, 0, 0, 0); // 1000ms de fade in desde negro

    }

    _createIntroText() {
        // Crear el texto en la pantalla
        let introText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,
            'Level 2',
            { fontFamily:'"Pixelify Sans"', fontSize: '64px', fill: '#ffffff' }
        ).setOrigin(0.5); // Centrar el texto

        // Aplicar un tween para desvanecerlo progresivamente
        this.tweens.add({
            targets: introText,
            alpha: 0,        // Desaparece el texto
            duration: 5000,  // 3 segundos
            delay: 1000,     // Espera 1 segundo antes de comenzar a desvanecer
            onComplete: () => { introText.destroy(); } // Elimina el texto después de desvanecerse
        });
    }

}

