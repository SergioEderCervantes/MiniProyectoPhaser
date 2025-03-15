class Level2 extends Level1 {
    constructor(key = "Level2") {
        super(key);
        this.color = 0xffffff;
        this.textColor = '#ffffff';
        this.playerAlias = verifiedAlias;
    }

    preload() {
        this.load.image('layer2.1', '../../assets/parallax_bg_lvl2/background_layer_1.png');
        this.load.image('layer2.2', '../../assets/parallax_bg_lvl2/background_layer_2.png');
        this.load.image('layer2.3', '../../assets/parallax_bg_lvl2/background_layer_3.png');
        this.load.image('spawn', '../../assets/tiles/spawn.png');
        this.load.image('blanco', '../../assets/tiles/blanco.png');
        this.load.image('fogata', '../../assets/tiles/fogata.png');
        this.load.image('troncos', '../../assets/tiles/troncos.png');
        this.load.image('tumbas', '../../assets/tiles/tumbas.png');
        this.load.image('yunke', '../../assets/tiles/yunke.png');
        

    }

    create(data){
        super.create();
        if(data){
            this.hits = data.hits;
            this.score = data.score;
            console.log(`Recibido: Vida = ${this.hits}, Puntuación = ${this.score}`);
            this.scoreText.setText('Score: ' + this.score);
            for (let i = 0; i < this.hits; i++) {
                this._updateHearts();
            }
        }
    }

    _cretatePlatforms() {
        this.platforms = this.physics.add.staticGroup();

        
        this.platforms.create(50, 250, 'platform').setScale(3).refreshBody();
        this.platforms.create(250, 250, 'platform').setScale(3).refreshBody();
        this.platforms.create(500, 400, 'platform').setScale(3).refreshBody();
        this.platforms.create(750, 220, 'platform').setScale(3).refreshBody();
        this.platforms.create(700, 400, 'platform').setScale(3).refreshBody();
        this.platforms.create(1160, 430, 'platform').setScale(3).refreshBody();
        this.platforms.create(1200, 180, 'platform').setScale(3).refreshBody();
        this.platforms.create(1260, 430, 'platform').setScale(3).refreshBody();
        this.platforms.create(1400, 180, 'platform').setScale(3).refreshBody();
        this.platforms.create(1630, 330, 'platform').setScale(3).refreshBody();
        this.platforms.create(1900, 200, 'platform').setScale(3).refreshBody();
        this.platforms.create(1950, 350, 'platformw').setScale(3).refreshBody();
        this.platforms.create(1950, 125, 'platformw').setScale(3).refreshBody();
        
        
        this.add.image(140, 222, 'fogata');//+140x +29y
        this.add.image(70, 214, 'blanco').flipX = true;//+70x +21y
        this.add.image(0, 212, 'troncos');//0x +19y
        this.add.image(230, 211, 'tumbas');//+230x +18y
        this.add.image(30, 224, 'yunke');//+30x +31y
        this.add.image(220, 189, 'spawn');//+220x -4y

        this.add.image(1540, 555, 'fogata');//+140x
        this.add.image(1470, 547, 'blanco');//+70x
        this.add.image(1400, 545, 'troncos');//0x
        this.add.image(1630, 544, 'tumbas');//+230x
        this.add.image(1430, 557, 'yunke');//+30x
        this.add.image(1620, 522, 'spawn');//+220x
        
        this.add.image(1370, 152, 'fogata');//+140x
        this.add.image(1200, 144, 'blanco').flipX=true;//+70x
        this.add.image(1460, 141, 'tumbas');//+230x
        this.add.image(1450, 119, 'spawn');//+220x

        this.add.image(1800, 560, 'cartel');

    
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
        
       
    }
    _createEnemys() {
        // Se requiere que sean un grupo de enemys y aparte setear su spawn y puntos de spawn
        this.enemys = this.physics.add.group();
        // Creacion periodica de enemigos cada 3 segundos (cambiar si es necesario):
        const spawnPoints = [
            { x: 70, y: 210 },
            { x: 1197, y: 140 },
            { x: 1520, y: 535 },
        ]
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                let spw = spawnPoints[Math.floor(Math.random() * 3)];
                let enemy = new Enemy(this, spw.x, spw.y, this.player);
                enemy.setSize(36,48);
                this.enemys.add(enemy)
            },
            loop: true,
        });
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
    
    _createCave(){
        this.add.image(1860,300,'layer6').setScrollFactor(1);
        this.add.image(620,300,'layer6').setScrollFactor(1);
    }
    
    

}

