class Level1 extends Phaser.Scene {
    constructor(key) {
        super({ key: key});
        this.platforms = null;
        this.player = null;
        this.enemys = null;
        this.cursors = null;
        this.stars = null;
        this.score = 0;
        this.scoreText = null;
        this.bombs = null;
        this.gameOver = false;
        this.isPaused = false;
    }


    // Metodos principales de la escena:

    // Metodo para cargar todos los assets y guardarlos en forma clave-valor
    preload() {
        this.load.image('forest', '../../assets/forest.jpg');
        this.load.image('ground', '../../assets/platform.png');
        this.load.image('star', '../../assets/star.png');
        this.load.image('bomb', '../../assets/bomb.png');
        this.load.spritesheet('dude',
            '../../assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('enemy',
            '../../assets/enemy.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    // Metodo que se llama cuando se crea la escena y la renderiza
    create() {
        this._createGround();
        this._createWorld();
        this._cretatePlatforms();
        this._createPlayer();
        this._createEnemys();
        this._createStars();
        this._createScoreText();
        this._createCursors();
        this._createCamera();
        // TODO si ya no vamos a querer bombas, eliminarlas totalmente del codigo
        this._createBombs();
        this._createIntroText();
        this._createColliders();
      

    }

    // Metodo que se llama cada que se refresca la pantalla
    update() {
        if (this.gameOver) return;
        this.player.handleMov(this.cursors);
        this.enemys.children.iterate(enemy => enemy.handleMov());

        if (this.score >= 10 && this.player.x >= 1950) {
            this.physics.pause();
            this.time.removeAllEvents
            this.cameras.main.fade(2000, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Level2');
            });
           
        }
    }

    // Metodos auxiliares de la escena

    _createGround() {
        this.ground = this.physics.add.staticGroup();
        this.ground.create(400, window.innerHeight + 110, 'ground').setScale(10).refreshBody();
    }
    _createWorld() {
        this.add.image(1590, window.innerHeight/2 - 50, 'forest');
        this.add.image(240, window.innerHeight/2 - 50, 'forest');
    }

    _cretatePlatforms() {
        // Se le asigna a las plataformas un grupo estatico (No se mueven ni afecta la gravedad
        // pero interactuan con demas objetos);
        

        // Se crea en el x = 600, y = 400, se escala para que sea mas grande y siempre que se 
        // escale se debe de usar el refreshBody para que su colision se actualice
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
        this.platforms.create(100, 500, 'ground');
        this.platforms.create(2000, 200, 'ground');
        this.platforms.create(1800, 460, 'ground');
        this.platforms.create(1500, 300, 'ground');
        this.platforms.create(1200, 100, 'ground');
        this.platforms.create(1170, 490, 'ground');
        

    }

    _createPlayer() {
        this.player = new Player(this, 100, 625);
    }

    _createEnemys() {
        // Se requiere que sean un grupo de enemys y aparte setear su spawn y puntos de spawn
        this.enemys = this.physics.add.group();
        // Creacion periodica de enemigos cada 3 segundos (cambiar si es necesario):
        const spawnPoints = [
            { x: 784, y: 180 },
            { x: 784, y: 360 },
            { x: 16, y: 210 },
            { x: 784, y: 512 }
        ]
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                let spw = spawnPoints[Math.floor(Math.random() * 4)];
                this.enemys.add(new Enemy(this, spw.x, spw.y, this.player))
            },
            loop: true,
        });
    }

    _createStars() {
        // Grupo estrellas
        this.stars = this.physics.add.group();
    }

    _createScoreText() {
        // Texto
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }


    _createBombs() {
        // Grupo de las bombas
        this.bombs = this.physics.add.group();
    }

    _createIntroText() {
        // Crear el texto en la pantalla
        let introText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 
            'Level 1', 
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
    
    _createColliders() {
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.ground);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.ground);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this._hitBomb, null, this);
        this.physics.add.overlap(this.player, this.stars, this._collectStar, null, this);
        this.physics.add.collider(this.enemys, this.ground);
        this.physics.add.collider(this.enemys, this.platforms);
        this.physics.add.collider(this.player, this.enemys, this._hitPlayer, null, this);
        this.physics.add.overlap(this.player.attacks, this.enemys, this._hitEnemy, null, this);
    }

    _createCursors() {
        // Crear el objeto cursor, el cual contiene ya el manager del teclado
        // con 4 eventos: up, down, right y left
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            attack_left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            attack_right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            attack_up: Phaser.Input.Keyboard.KeyCodes.UP,
            scape: Phaser.Input.Keyboard.KeyCodes.ESC
        });
        this.cursors.scape.on("down", () => {
            // TODO: manejar bien las pausas (con un menu o idk)
            if (this.isPaused) this.physics.resume();
            else this.physics.pause();
            this.isPaused = !this.isPaused;
        });
    }

    _createCamera() {
        // Se setea la camara principal para que siga al jugador y marca los limites del mapa en la camara
        this.cameras.main.setBounds(0, 0, 2610, window.innerHeight.toFixed(0));
        this.cameras.main.startFollow(this.player, true, 1, 1);
    }

    _collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        star.destroy();
    }

    _hitBomb(player, bomb) {
        player.setTint(0xff0000);
        player._stop();
        this._onGameOver();
    }


    _hitPlayer(player, enemy) {
        player.setTint(0xff0000);
        player._stop();
        enemy._stop();
        this._onGameOver();
    }

    // WARNING: PORQUE CHINGADOS AQUI ME LO TOMA EN ORDEN INVERSO?????????
    // CREO QUE MAGICAMENTE SE ARREGLO NMMS
    _hitEnemy(attack, enemy) {
        enemy.disableBody(true, true);
        // Crear una estrella nueva
        const star = this.physics.add.sprite(enemy.x, enemy.y, 'star');
        this.stars.add(star);
        star.setBounce(1);
        enemy.destroy();
    }


    _onGameOver(){
        this.physics.pause();
        this.time.removeAllEvents();
        this.gameOver = true;
    }
}

