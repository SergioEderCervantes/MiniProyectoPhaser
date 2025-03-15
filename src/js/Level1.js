class Level1 extends Phaser.Scene {
    constructor(key = "Level1") {
        super({ key: key });
        this.platforms = null;
        this.player = null;
        this.enemys = null;
        this.cursors = null;
        this.stars = null;
        this.score = 0;
        this.hits = 0;
        this.scoreText = null;
        this.gameOver = false;
        this.isPaused = false;
        this.menuContainer = null;
        this.dashCooldownBar = null;
        this.heartsGroup = null;
        this.gemGroup = null;
        this.playerAlias = verifiedAlias;
        this.playerAliasText = null;
        this.heartDisplay = null;
        this.color = 0x6a4952;
        this.textColor = '#6a4952';
        this.healthCooldown = false;
        this.timer = 0;
        this.timerText = null;
        this.isTimerActive = false;
        this.dateText = null;
    }


    // Metodos principales de la escena:

    // Metodo para cargar todos los assets y guardarlos en forma clave-valor
    preload() {
        this.load.image('layer1', '../../assets/parallax_bg_lvl1/Hills Layer 01.png');
        this.load.image('layer2', '../../assets/parallax_bg_lvl1/Hills Layer 02.png');
        this.load.image('layer3', '../../assets/parallax_bg_lvl1/Hills Layer 03.png');
        this.load.image('layer4', '../../assets/parallax_bg_lvl1/Hills Layer 04.png');
        this.load.image('layer5', '../../assets/parallax_bg_lvl1/Hills Layer 05.png');
        this.load.image('layer6', '../../assets/parallax_bg_lvl1/Hills Layer 06.png');

        this.load.image('ground', '../../assets/platform.png');
        this.load.image('star', '../../assets/star.png');
        this.load.image('platform', '../../assets/plank.png');
        this.load.image('platformw', '../../assets/plankwall.png');
        this.load.image('button', '../../assets/btnPerdonJost.png')
        this.load.image('back', '../../assets/cave.png')
        this.load.image('front', '../../assets/cavef.png')
        this.load.image('rocks', '../../assets/rocks.png')
        this.load.image('heart', '../../assets/Corazonlleno.png');
        this.load.image('emptyHeart', '../../assets/CorazonVacio.png');
        this.load.image('heartObj', '../../assets/objetcs/heartObj.png');this.load.image('cartel', '../../assets/tiles/cartel.png')
        this.load.spritesheet('idle',
            '../../assets/player/_Idle.png',
            { frameWidth: 120, frameHeight: 80 }
        );
        this.load.spritesheet('die',
            '../../assets/player/_Death.png',
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
        this.load.spritesheet('run',
            '../../assets/player/_Run.png',
            { frameWidth: 120, frameHeight: 80 }
        );
        this.load.spritesheet('enemy',
            '../../assets/enemy.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('eIdle',
            '../../assets/enemy/Skeleton_Idle.png',
            { frameWidth: 36, frameHeight: 48 }
        );
        this.load.spritesheet('eWalk',
            '../../assets/enemy/Skeleton_Walk.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('eAttack',
            '../../assets/enemy/Skeleton_Attack.png',
            { frameWidth: 65, frameHeight: 56 }
        );
        this.load.spritesheet('eDead',
            '../../assets/enemy/Skeleton_Dead.png',
            { frameWidth: 50, frameHeight: 48 }
        );
        this.load.spritesheet('gem', '../../assets/objetcs/gemSprite.png',
            { frameWidth: 23, frameHeight: 27 }
        );

        this.load.audio('game', '../../assets/music/game.ogg');
        this.load.audio('win', '../../assets/music/win.mp3');
        this.load.audio('next', '../../assets/music/next.mp3');
        this.load.audio('menu', '../../assets/music/menu.mp3');
        this.load.audio('lose', '../../assets/music/lose.wav');
        this.load.audio('coin', '../../assets/music/coin.mp3');
        this.load.audio('special', '../../assets/music/special_item.mp3');

    }
    // Metodo que se llama cuando se crea la escena y la renderiza
    create() {
        this._createGround();
        this._createWorld();

        this._cretatePlatforms();
        this._createPlayer();
        this._createEnemys();
        this._createStars();
        this._createCave();
        this._createCursors();
        this._createCamera();
        this._createIntroText();
        this._createHeartGroup();
        this._createGemGroup();
        this._createColliders();
        // Tema UI
        this._createUIElements();
        this.next = this.sound.add('next', { volume: 0.5 });
        this.win = this.sound.add('win', { volume: 0.5 });
        this.menu = this.sound.add('menu', { loop: true, volume: 0.5 });
        this.loseSound = this.sound.add('lose', { volume: 0.5 });
        this.itemSound = this.sound.add('coin', { volume: 0.2 });
        this.specialItemSound = this.sound.add('special', { volume: 0.3 });
        this.gameSound = this.sound.add('game', { loop: true, volume: 0.4 });
        this.gameSound.play();
        
    }

    // Metodo que se llama cada que se refresca la pantalla
    update() {
        if (this.isPaused) return;
        if (this.gameOver) return;
        this.player.handleMov(this.cursors);
        this.enemys.children.iterate(enemy => enemy.handleMov());
        this._updateDashCooldownUI();
        this._checkSwitchLvl();
        // Prueba para crear la pantalla de ganador
     

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
        // Parallax efect
        this.add.image(620, 310, 'layer1').setScrollFactor(0);
        this.add.image(1625, 310, 'layer1').setScrollFactor(0);

        this.add.image(620, 310, 'layer2').setScrollFactor(0.2);
        this.add.image(1840, 310, 'layer2').setScrollFactor(0.2);

        this.add.image(620, 310, 'layer3').setScrollFactor(0.4);
        this.add.image(1860, 310, 'layer3').setScrollFactor(0.4);

        this.add.image(620, 310, 'layer4').setScrollFactor(0.6);
        this.add.image(1860, 310, 'layer4').setScrollFactor(0.6);

        this.add.image(620, 300, 'layer5').setScrollFactor(1);
        this.add.image(1860, 300, 'layer5').setScrollFactor(1);
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
        this.platforms.create(1950, 358, 'platformw').setScale(3).refreshBody();
        this.platforms.create(1950, 125, 'platformw').setScale(3).refreshBody();
        this.platforms.create(1915, 500, 'rocks');

        this.add.image(1760, 560, 'cartel');
        this.add.image(1880, 530, 'back');

    }

    _createPlayer() {
        this.player = new Player(this, 90, 525);
        this.player.setSize(24, 47);
        this.player.setOffset(42, 35);
    }

    _createEnemys() {
        // Se requiere que sean un grupo de enemys y aparte setear su spawn y puntos de spawn
        this.enemys = this.physics.add.group();
        // Creacion periodica de enemigos cada 3 segundos (cambiar si es necesario):
        const spawnPoints = [
            { x: 70, y: 210 },
            { x: 920, y: 544 },
            { x: 1197, y: 55 },
            { x: 1520, y: 535 },
        ]
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                let spw = spawnPoints[Math.floor(Math.random() * 4)];
                let enemy = new Enemy(this, spw.x, spw.y, this.player);
                enemy.setSize(36, 48);
                this.enemys.add(enemy)
            },
            loop: true,
        });
    }

    _createStars() {
        // Grupo estrellas
        this.stars = this.physics.add.group();


    }
    _createCave() {

        this.add.image(1915, 556, 'front');
        this.add.image(1820, 580, 'rocks').setScale(1.5);
        this.add.image(620, 305, 'layer6').setScrollFactor(1.1);
        this.add.image(1800, 305, 'layer6').setScrollFactor(1.1);
    }
    _createIntroText() {
        // Crear el texto en la pantalla
        let introText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY,
            'Level 1',
            { fontFamily: '"Pixelify Sans"', fontSize: '64px', fill: '#ffffff' }
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

    _createHeartGroup() {
        this.heartsGroup = this.physics.add.group();
        // generar corazones de forma aleatoria
        this.time.addEvent({
            // Solo se crean cada 30 a 40 segundos
            delay: Phaser.Math.Between(30000, 40000),
            callback: this.spawnHeart,
            callbackScope: this,
            loop: true
        });
    }

    _createGemGroup() {
        this.gemGroup = this.physics.add.group();
        // Generar la geama de forma aleatoria
        this.time.addEvent({
            // Solo se crean cada 50 a 70 seg
            delay: Phaser.Math.Between(50000, 70000),
            callback: this.spawnGem,
            callbackScope: this,
            loop: true
        });
    }
    spawnEnemy(x, y) {
        let enemy = new Enemy(this, x, y, this.player);
        enemy.setSize(36, 48);
        this.enemys.add(enemy);
    }
    spawnHeart() {
        let x = Phaser.Math.Between(50, 1500);
        let y = Phaser.Math.Between(50, 550);
        let heart = new Heart(this, x, y);
        this.heartsGroup.add(heart);
    }

    spawnGem() {
        let x = Phaser.Math.Between(50, 1500);
        let y = Phaser.Math.Between(50, 550);
        let gem = new Gem(this, x, y);
        this.gemGroup.add(gem);
    }

    collectHeart(player, heart) {
        this.specialItemSound.play();
        heart.onCollect();
    }

    collectGem(player, gem) {
        gem.onCollect();
        this.specialItemSound.play();

    }

    _createColliders() {
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.ground);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this._collectStar, null, this);
        this.physics.add.collider(this.enemys, this.ground);
        this.physics.add.collider(this.enemys, this.platforms);
        this.physics.add.collider(this.player, this.enemys, this._hitPlayer, null, this);

        this.physics.add.overlap(this.player.attacks, this.enemys, this._hitEnemy, null, this);
        this.physics.add.collider(this.heartsGroup, this.platforms);
        this.physics.add.collider(this.heartsGroup, this.ground);
        this.physics.add.collider(this.heartsGroup, this.player, this.collectHeart, null, this);

        this.physics.add.collider(this.gemGroup, this.platforms);
        this.physics.add.collider(this.gemGroup, this.ground);
        this.physics.add.collider(this.gemGroup, this.player, this.collectGem, null, this);
     
        
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
            scape: Phaser.Input.Keyboard.KeyCodes.ESC,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        this.cursors.scape.on("down", () => {
            this._handlePause();
        });
    }

    _createCamera() {
        // Se setea la camara principal para que siga al jugador y marca los limites del mapa en la camara
        // Para que a Jostin se le vea bien, es 2500, para que a mi y a Said se vea bien es 2840
        this.cameras.main.setBounds(0, 0, 2840, 600);
        this.cameras.main.startFollow(this.player, true, 1, 1);
    }

    _collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        star.destroy();

        this.itemSound.play();
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

        this.time.delayedCall(3000, () => player.isInvincible = false);
    }


    _hitPlayer(player, enemy) {
        if (this.healthCooldown || player.isInvincible || enemy.isDying) return;
        enemy.attack();
        this._takeDamage(player, enemy);
    }


    _takeDamage(player) {
        this.healthCooldown = true;

        this.time.delayedCall(500, () => {

            if (this.hits >= 2) {  // Usar operador de incremento
                this.hits++;
                this.updateHearts();
                this._deadPlayer(player);
            } else {
                this.hits++;
                this.updateHearts();
                this._activateInvincibility(player);
            }

            this.healthCooldown = false;
        });
    }
    _deadPlayer(player, enemy) {

        player.setTint(0xff0000);
        player._stop();
        this._onGameOver();
    }

    // WARNING: PORQUE CHINGADOS AQUI ME LO TOMA EN ORDEN INVERSO?????????
    // CREO QUE MAGICAMENTE SE ARREGLO NMMS
    _hitEnemy(attack, enemy) {
        enemy.die();
    }

    _win() {
        this.physics.pause();
        this.time.removeAllEvents();
        this.gameOver = true;
        this.gameSound.stop();
        this.win.play();
            this._createWinMenu();
        
    }
    _onGameOver() {
        this.player.death();
        // IMPORTANT: aqui se puede sacar el puntaje y el nombre del jugador para mandarlo al localstorage

        this.physics.pause();
        this.time.removeAllEvents();
        this.gameOver = true;
        
        this.gameSound.stop();
        this.loseSound.play();
        this.time.delayedCall(2000, () => {
            this._createMenuGO();
        });
    }


    _handlePause() {
        // Si no estaba previamente pausado, hacer pausa
        if (!this.isPaused) {
            this.physics.pause();
            this.time.paused = true;
            this.anims.pauseAll();
            this.sound.pauseAll();
            this._createMenuPause();
        } else {
            // Ya estaba pausado, logica para resumir 
            this.physics.resume();
            this.time.paused = false;
            this.anims.resumeAll();
            this.sound.resumeAll();
            this._closeMenu();
        }
        this.isPaused = !this.isPaused;
    }

    _checkSwitchLvl() {
        if (this.score >= 10 && this.player.x >= 1950) {
            this.physics.pause();
            this.time.removeAllEvents();
            this.cameras.main.fade(2000, 0, 0, 0);
            this.cameras.main.on('camerafadeoutcomplete', () => {
                this.gameSound.stop();
                this.next.play();
                this.scene.start('Level2',{hits: this.hits, score: this.score});
            });

        }
    }

    // Creacion de Menus y UI
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
        this.menuContainer = this.add.container(0, 0, [sombra, btn1, btn2, text1, text2, text3])
        this._addHoverEffect(btn1);
        this._addHoverEffect(btn2);

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
    _createMenuGO() {
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
        const text = this.add.text(dispCentX - 150, btn.y - 16, "Volver al Menu Principal", textStyle);
        // Contenedor
        this.menuContainer = this.add.container(0, 0, [sombra, title, btn, text])
        this._addHoverEffect(btn);

        sombra.setDepth(0);
        this.menuContainer.setDepth(1);

        btn.on('pointerdown', () => location.reload());
    }

    _createWinMenu(){
        // Como esta ya es la pantalla final, podemos agregar algo mas padre, tmb en el menu de derrota
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
        const title = this.add.text(dispCentX - 150, dispCentY - 200, "Felicidades!! Has ganado", textStyle);
        const btn = this.add.image(dispCentX + 20, dispCentY, 'button').setInteractive();
        const text = this.add.text(dispCentX - 150, btn.y - 16, "Volver al Menu Principal", textStyle);
        // Contenedor
        this.menuContainer = this.add.container(0, 0, [sombra, title, btn, text])
        this._addHoverEffect(btn);

        sombra.setDepth(0);
        this.menuContainer.setDepth(1);

        btn.on('pointerdown', () => location.reload());
    }

    // Estoy pensandolo para que esta funcion mate a todos los menus, si el create no se puede al menos el destroy
    _closeMenu() {
        if (this.menuContainer) {
            this.menuContainer.destroy();
            this.menuContainer = null;
        }
    }

    _addHoverEffect(button) {
        button.on('pointerover', () => {
            button.setTint(0xaaaaaa); 
        });
    
        button.on('pointerout', () => {
            button.clearTint(); 
        });
    
        button.on('pointerdown', () => {
            button.setScale(0.95); 
        });
    
        button.on('pointerup', () => {
            button.setScale(1); 
        });
    }
    _createUIElements() {
        const fontStyle = {
            fontFamily: '"Pixelify Sans"',
            fontSize: '32px',
            color: this.textColor
        };

        //Score del jugador
        this.scoreText = this.add.text(16, 16, 'Score: 0', fontStyle );


        // colldown del dash
        this.cooldownBar = this.add.graphics();
        this.cooldownBar.fillStyle(this.color, 1);
        this.cooldownBar.fillRect(16, 50, 100, 15);
        this.cooldownBar.setDepth(10);
        // Nombre del jugador
        this.playerAliasText = this.add.text(window.innerWidth - 150, 16, this.playerAlias, fontStyle);
        this.playerAliasText.setScrollFactor(0);
        // Corazones de Vida (Abajo del score)
        this.heartDisplay = this.physics.add.staticGroup({
            key: 'heart',
            repeat: 2,
            setXY: { x: window.innerWidth - 120, y: 60, stepX: 30 }
        });


        // Hacer que nada se mueva a pesar del scroll
        this.cooldownBar.setScrollFactor(0);
        this.scoreText.setScrollFactor(0);
        this.heartDisplay.children.iterate(child => child.setScrollFactor(0));

        // Timer de las gemas
        this.timerText = this.add.text(window.innerWidth / 2 - 200, 50, "", {
            fontFamily: '"Pixelify Sans"',
            fontSize: '20px',
            color: this.textColor
        }).setScrollFactor(0).setAlpha(0);

        this.timer = 10.00
        this.time.addEvent({
            delay: 10, // Actualiza cada 10 ms para mostrar milisegundos
            callback: this._updateTimer,
            callbackScope: this,
            loop: true
        });

        // Fecha
        const date = new Date().toLocaleDateString();
        this.dateText = this.add.text(180,16,  date,fontStyle).setScrollFactor(0);
    }
    _updateDashCooldownUI() {
        let progress = this.player.getDashCooldwnProg();
        this.cooldownBar.clear();
        this.cooldownBar.fillStyle(this.color, 1);
        this.cooldownBar.fillRect(16, 50, 100 * progress, 15);
    }

    updateHearts() {
        let hearts = this.heartDisplay.getChildren();
        let maxLives = 3; // Número máximo de corazones


        let filledHearts = maxLives - this.hits;

        hearts.forEach((heart, index) => {
            if (index < filledHearts) {
                heart.setTexture('heart'); // Corazón lleno
                heart.setAlpha(1);
            } else {
                heart.setTexture('emptyHeart'); // Corazón vacío
                this.tweens.add({
                    targets: heart,
                    alpha: 0,
                    yoyo: true,
                    repeat: 6,
                    duration: 150
                });
            }
        });
    }
    startTimer() {
        this.timer = 10.00;
        this.isTimerActive = true;
        this.timerText.setAlpha(1); // Mostrar el texto
    }
    _updateTimer() {
        if (!this.isTimerActive) return
        this.timer -= 0.01; // Reducir tiempo

        if (this.timer <= 0) {
            this.timer = 10.00;
            this.isTimerActive = false;
            this.timerText.setAlpha(0); // Ocultar el texto
        } else {
            this.timerText.setText(`Ha aparecido una gema! desaparecerá en: ${this.timer.toFixed(2)}`);
        }
    }
}

function startGame() {
    var config = {
        type: Phaser.AUTO,
        width: 2200,
        height: 620,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: true
            }
        },
        scene: [Level1, Level2]
    };

    return new Phaser.Game(config);
}

window.startGame = startGame
