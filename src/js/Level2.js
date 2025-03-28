class Level2 extends Level1 {
    constructor(key = "Level2") {
        super(key);
        this.color = 0xffffff;
        this.textColor = '#ffffff';
        this.playerAlias = verifiedAlias;
        this.structures = null;
        this.objStructures = [];
        this.isAttackingStructure = false;
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

        this.load.audio('hit', '../../assets/music/hit.wav');
    }

    create(data) {
        this._createStructures();
        super.create();
        this._createObjectiveText(); // Llamar a la función para mostrar el texto del objetivo
        if (data) {
            this.hits = data.hits;
            this.score = data.score;
            console.log(`Recibido: Vida = ${this.hits}, Puntuación = ${this.score}`);
            this.scoreText.setText('Score: ' + this.score);
            this.updateHearts();
        }
        this.hit = this.sound.add('hit', { volume: 0.5 });

    }

    _createObjectiveText() {
        const mainCamara = this.cameras.main;

        const dispCentX = window.innerWidth / 2 + mainCamara.scrollX;
        const dispCentY = window.innerHeight / 2 + mainCamara.scrollY;

        let objectiveText = this.add.text(this.cameras.main.centerX, 50,
            'Objetivo: Destruye todos los espantapájaros',
            { fontFamily: '"Pixelify Sans"', fontSize: '32px', fill: '#ffffff' }
        ).setOrigin(0.5).setPosition(dispCentX,dispCentY-200); // Centrar el texto

        // Aplicar un tween para desvanecerlo progresivamente
        this.tweens.add({
            targets: objectiveText,
            alpha: 0,        // Desaparece el texto
            duration: 5000,  // 5 segundos
            delay: 3000,     // Espera 3 segundos antes de comenzar a desvanecer
            onComplete: () => { objectiveText.destroy(); } // Elimina el texto después de desvanecerse
        });
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

        this.add.image(1540, 555, 'fogata');//+140x
        this.add.image(1470, 547, 'blanco');//+70x
        this.add.image(1400, 545, 'troncos');//0x
        this.add.image(1630, 544, 'tumbas');//+230x
        this.add.image(1430, 557, 'yunke');//+30x
        
        this.add.image(1370, 152, 'fogata');//+140x
        this.add.image(1200, 144, 'blanco').flipX = true;//+70x
        this.add.image(1460, 141, 'tumbas');//+230x
        
        this.add.image(1800, 560, 'cartel');
    }

    _createWorld() {
        this.add.image(551, 310, 'layer2.1').setScrollFactor(0);
        this.add.image(1653, 310, 'layer2.1').setScrollFactor(0);
        
        this.add.image(551, 310, 'layer2.2').setScrollFactor(0.4);
        this.add.image(1653, 310, 'layer2.2').setScrollFactor(0.4);
        
        this.add.image(551, 310, 'layer2.3').setScrollFactor(0.8);
        this.add.image(1653, 310, 'layer2.3').setScrollFactor(0.8);
        
        this.add.image(620, 300, 'layer5').setScrollFactor(0.8);
        this.add.image(1860, 300, 'layer5').setScrollFactor(0.8);
    }

    _createStructures() {
        this.structures = this.physics.add.staticGroup();
        const img1 = this.add.image(220, 189, 'spawn').setDepth(1);
        const img2 = this.add.image(1450, 119, 'spawn').setDepth(1);
        const img3 = this.add.image(1620, 522, 'spawn').setDepth(1);
        const spawn1 = new Structure(this, 220, 189, this.structures, img1);
        const spawn2 = new Structure(this, 1450, 119, this.structures, img2);
        const spawn3 = new Structure(this, 1620, 522, this.structures, img3);
        this.objStructures.push(spawn1, spawn2, spawn3);
    }

    _createColliders() {
        super._createColliders();
        // Crear la colision con el ataque
        this.physics.add.overlap(this.player.attacks, this.structures, this._hitStructures, null, this);
    }

    _hitStructures(attack, structureSprite) {
        if (this.isAttackingStructure) return;
        this.isAttackingStructure = true;
        console.log(attack);
        console.log(structureSprite);
        const structure = this.objStructures.find(child => child.sprite == structureSprite);
        this.hit.play();
        structure.takeDamage();
        this.time.delayedCall(1000, () => this.isAttackingStructure = false);
    }

    _createEnemys() {
        // Se requiere que sean un grupo de enemys y aparte setear su spawn y puntos de spawn
        this.enemys = this.physics.add.group();
        // Creacion periodica de enemigos cada 3 segundos (cambiar si es necesario):
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                let spawnPoints = [];
                this.structures.children.iterate(child => {
                    spawnPoints.push({ x: child.x, y: child.y });
                });
                if (spawnPoints.length === 0) return;
                let spw = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
                let enemy = new Enemy(this, spw.x, spw.y, this.player);
                enemy.setSize(36, 48);
                this.enemys.add(enemy);
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
            { fontFamily: '"Pixelify Sans"', fontSize: '64px', fill: '#ffffff' }
        ).setOrigin(0.5); // Centrar el texto

        // Aplicar un tween para desvanecerlo progresivamente
        this.tweens.add({
            targets: introText,
            alpha: 0,        // Desaparece el texto
            duration: 5000,  // 5 segundos
            delay: 1000,     // Espera 1 segundo antes de comenzar a desvanecer
            onComplete: () => { introText.destroy(); } // Elimina el texto después de desvanecerse
        });
    }

    _createCave() {
        this.add.image(1860, 305, 'layer6').setScrollFactor(1);
        this.add.image(620, 305, 'layer6').setScrollFactor(1);
    }

    _checkSwitchLvl() {
        if (this.structures.children.entries.length === 0) {
            this._win();
        }
    }
}