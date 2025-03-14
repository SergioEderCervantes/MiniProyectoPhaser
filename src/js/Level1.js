class Level1 extends Phaser.Scene {
    constructor(key) {
        super({ key: key });
        this.platforms = null;
        this.player = null;
        this.enemys = null;
        this.cursors = null;
        this.stars = null;
        this.score = 0;
        this.hits = 0;
        this.scoreText = null;
        this.bombs = null;
        this.gameOver = false;
        this.isPaused = false;
        this.playerEnemyCollider = null;
        this.menuContainer = null;
    }


    // Metodos principales de la escena:

    // Metodo para cargar todos los assets y guardarlos en forma clave-valor
    preload() {
        this.load.image('forest', '../../assets/forest.jpg');
        this.load.image('ground', '../../assets/platform.png');
        this.load.image('star', '../../assets/star.png');
        this.load.image('platform', '../../assets/plank.png');
        this.load.image('bomb', '../../assets/bomb.png');
        this.load.image('button', '../../assets/btnPerdonJost.png')
        
        this.load.spritesheet('idle',
            '../../assets/player/_Idle.png',
            { frameWidth: 120, frameHeight: 80 }
        );
        this.load.spritesheet('attack',
            '../../assets/player/_Attack.png',
            { frameWidth: 120, frameHeight: 80 }
        );
        this.load.spritesheet('dash',
            '../../assets/player/_Dash.png',
            { frameWidth: 120, frameHeight: 80 }
        );
        this.load.spritesheet('jump',
            '../../assets/player/_Jump.png',
            { frameWidth: 120, frameHeight: 80 }
        );
        this.load.spritesheet('run',
            '../../assets/player/_Run.png',
            { frameWidth: 120, frameHeight: 80 }
        );
        // this.load.spritesheet('idle',
        //     '../../assets/player/_idle.png',
        //     { frameWidth: 120, frameHeight: 80 }
        // );
        // this.load.spritesheet('idle',
        //     '../../assets/player/_idle.png',
        //     { frameWidth: 120, frameHeight: 80 }
        // );
        // this.load.spritesheet('idle',
        //     '../../assets/player/_idle.png',
        //     { frameWidth: 120, frameHeight: 80 }
        // );
        // this.load.spritesheet('idle',
        //     '../../assets/player/_idle.png',
        //     { frameWidth: 120, frameHeight: 80 }
        // );
        // this.load.spritesheet('idle',
        //     '../../assets/player/_idle.png',
        //     { frameWidth: 120, frameHeight: 80 }
        // );
        this.load.spritesheet('enemy',
            '../../assets/enemy.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    // Metodo que se llama cuando se crea la escena y la renderiza
    create() {
        
        this._createWorld();
        this._createGround();
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
            this.time.removeAllEvents();
            this.cameras.main.fade(2000, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.scene.start('Level2');
            });

        }
    }

    // Metodos auxiliares de la escena

    _createGround() {
        this.ground = this.physics.add.staticGroup({
            key: 'ground',
            repeat: 4,
            setXY: { x: 0, y: 600, stepX: 576 }

        });
        this.ground.children.iterate((child) => {
            child.setScale(2);
            child.refreshBody();
        });
    }
    _createWorld() {
        this.add.image(1590, 220, 'forest');
        this.add.image(240, 220, 'forest');
    }

    _cretatePlatforms() {
        // Se le asigna a las plataformas un grupo estatico (No se mueven ni afecta la gravedad
        // pero interactuan con demas objetos);


        // Se crea en el x = 600, y = 400, se escala para que sea mas grande y siempre que se 
        // escale se debe de usar el refreshBody para que su colision se actualice
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600, 400, 'platform').setScale(3).refreshBody();
        this.platforms.create(50, 250, 'platform').setScale(3).refreshBody();
        this.platforms.create(750, 220, 'platform').setScale(3).refreshBody();
        this.platforms.create(100, 500, 'platform').setScale(3).refreshBody();
        this.platforms.create(2000, 200, 'platform').setScale(3).refreshBody();;
        this.platforms.create(1800, 460, 'platform').setScale(3).refreshBody();;
        this.platforms.create(1500, 300, 'platform').setScale(3).refreshBody();;
        this.platforms.create(1200, 100, 'platform').setScale(3).refreshBody();;
        this.platforms.create(1170, 490, 'platform').setScale(3).refreshBody();;


    }

    _createPlayer() {
        this.player = new Player(this, 90, 400);
        this.player.setSize(24, 47);
        this.player.setOffset(42, 35);
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
        // this.time.addEvent({
        //     delay: 1000,
        //     callback: () => {
        //         let spw = spawnPoints[Math.floor(Math.random() * 4)];
        //         this.enemys.add(new Enemy(this, spw.x, spw.y, this.player))
        //     },
        //     loop: true,
        // });
    }

    _createStars() {
        // Grupo estrellas
        this.stars = this.physics.add.group();
    }

    _createScoreText() {
        // Texto
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
        this.scoreText.setScrollFactor(0);
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
        this.playerEnemyCollider = this.physics.add.collider(this.player, this.enemys, this._hitPlayer, null, this);
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
            this._handlePause();
        });
    }

    _createCamera() {
        // Se setea la camara principal para que siga al jugador y marca los limites del mapa en la camara
        this.cameras.main.setBounds(0, 0, 2610, 600);
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

    _activateInvincibility(player) {
        player.isInvincible = true;

        this.tweens.add({
            targets: player,
            alpha: 0,
            ease: 'Linear',
            duration: 100,
            repeat: 14,
            yoyo: true
        });
        this.physics.world.removeCollider(this.playerEnemyCollider);

        this.time.delayedCall(3000, () => {
            player.isInvincible = false;
            this.playerEnemyCollider = this.physics.add.collider(this.player, this.enemys, this._hitPlayer, null, this);

        });
    }

    _hitPlayer(player, enemy) {


        if (this.hits === 2) {
            this._deadPlayer(player, enemy);
        } else {
            this.hits++;
            enemy.destroy();
            this._activateInvincibility(player); // Activar la inmunidad
        }
    }
    _deadPlayer(player, enemy) {
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


    _onGameOver() {
        this.physics.pause();
        this.time.removeAllEvents();
        this.gameOver = true;
        this._createMenuGO();
    }


    _handlePause() {
        console.log(this.isPaused)
        // Si no estaba previamente pausado, hacer pausa
        if (!this.isPaused) {
            this.physics.pause();
            this.time.paused = true;
            this.anims.pauseAll();
            this._createMenuPause();
        } else {
            // Ya estaba pausado, logica para resumir 
            this.physics.resume();
            this.time.paused = false;
            this.anims.resumeAll();
            this._closeMenu();
        }
        this.isPaused = !this.isPaused;
    }



    // Creacion de Menus
    _createMenuPause() {
        const mainCamara = this.cameras.main;
        const dispCentX = window.innerWidth / 2 + mainCamara.scrollX;
        const dispCentY = window.innerHeight / 2 + mainCamara.scrollY;
        // Capa de sombra que cubre toda la pantalla
        const sombra = this.add.rectangle(
            mainCamara.scrollX + this.scale.width / 2,  
            mainCamara.scrollY + this.scale.height / 2,
            this.scale.width, this.scale.height,
            0x000000, 0.8  
        ).setOrigin(0.5);


        // Crea el grupo de la UI y lo llena:
        const textStyle = { fontSize: '32px', fill: "#fff" };
        const btn1 = this.add.image(dispCentX, dispCentY - 100, 'button').setInteractive();
        const btn2 = this.add.image(dispCentX, dispCentY + 100, 'button').setInteractive();
        const text1 = this.add.text(dispCentX - 55, dispCentY - 300, "Paused", textStyle);
        const text2 = this.add.text(btn1.x - 55, btn1.y - 16, "Resume", textStyle);
        const text3 = this.add.text(btn1.x - 55, btn2.y - 16, "Restart", textStyle);

        // Contenedor
        this.menuContainer = this.add.container(0, 0, [sombra, btn1, btn2, text1, text2, text3 ])

        
        sombra.setDepth(0);
        this.menuContainer.setDepth(1);


        btn1.on('pointerdown', () => {
            this._handlePause();
        });

        btn2.on('pointerdown', () => {
            console.log('Reiniciando la escena');
            // Aqui hay un error, cuando se hace reset de la escena los enemigos no aparecen, sin embargo
            // si no estoy mal, se tiene que regresar al menu principal, no aqui, so lo dejare asi hasta estar seguros
            // this.scene.restart();
            location.reload();
        });

    }

    // Menu para el game Over
    _createMenuGO(){
        const mainCamara = this.cameras.main;
        const dispCentX = window.innerWidth / 2 + mainCamara.scrollX;
        const dispCentY = window.innerHeight / 2 + mainCamara.scrollY;
        // Capa de sombra que cubre toda la pantalla
        const sombra = this.add.rectangle(
            mainCamara.scrollX + this.scale.width / 2,  
            mainCamara.scrollY + this.scale.height / 2,
            this.scale.width, this.scale.height,
            0x000000, 0.8  
        ).setOrigin(0.5);
        const textStyle = { fontSize: '32px', fill: "#fff" };

        // UI elements
        const title = this.add.text(dispCentX - 70, dispCentY - 200, "Game Over", textStyle);
        const btn = this.add.image(dispCentX + 20, dispCentY, 'button').setInteractive();
        const text = this.add.text(dispCentX- 70, btn.y - 16, "Reiniciar", textStyle);
        // Contenedor
        this.menuContainer = this.add.container(0, 0, [sombra, title, btn, text ])

        
        sombra.setDepth(0);
        this.menuContainer.setDepth(1);

        //  TODO IMPORTANTE: probablemente la maestra se empute si ve que asi reiniciamos el juego
        btn.on('pointerdown', () => location.reload());
    }


    // Estoy pensandolo para que esta funcion mate a todos los menus, si el create no se puede al menos el destroy
    _closeMenu(){
        if (this.menuContainer) {
            this.menuContainer.destroy(); 
            this.menuContainer = null;
        }
    }
}

