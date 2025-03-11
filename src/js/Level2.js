class Level2 extends Level1 {
    constructor(key) {
        super(key);
    }

    preload() {
        this.load.image('forest3', '../../assets/forest3.jpg');
    }

   
    _createWorld() {
        this.add.image(1590, 220, 'forest3');
        this.add.image(240, 220, 'forest3');
    }

    _createCamera(){

        this.cameras.main.setBounds(0, 0, 2610, window.innerHeight.toFixed(0));
        this.cameras.main.startFollow(this.player, true, 1, 1);
        this.cameras.main.fadeIn(2000, 0, 0, 0); // 1000ms de fade in desde negro

    }

    _createIntroText() {
        // Crear el texto en la pantalla
        let introText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 
            'Level 2', 
            { fontSize: '64px', fill: '#ffffff' }
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

