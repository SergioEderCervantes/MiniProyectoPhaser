class Level2 extends Level1 {
    constructor(key) {
        super(key);
    }

    preload() {
        this.load.image('forest3', '../../assets/forest3.jpg');
        this.load.image('layer2.1', '../../assets/parallax_bg_lvl2/background_layer_1.png');
        this.load.image('layer2.2', '../../assets/parallax_bg_lvl2/background_layer_2.png');
        this.load.image('layer2.3', '../../assets/parallax_bg_lvl2/background_layer_3.png');

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
        
        this.add.image(620,310,'layer5').setScrollFactor(0.8);
        this.add.image(1860,310,'layer5').setScrollFactor(0.8);
        
        this.add.image(1860,320,'layer6').setScrollFactor(1);
        this.add.image(620,320,'layer6').setScrollFactor(1);
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

