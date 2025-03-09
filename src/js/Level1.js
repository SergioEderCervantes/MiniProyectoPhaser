class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
        this.platforms = null;
        this.player = null;
        this.cursors = null;
        this.stars = null;
        this.score = 0;
        this.scoreText = null;
        this.bombs = null;
        this.gameOver = false;
    }


    // Metodos principales de la escena:

    // Metodo para cargar todos los assets y guardarlos en forma clave-valor
    preload() {
        this.load.image('sky', '../../assets/sky.png');
        this.load.image('ground', '../../assets/platform.png');
        this.load.image('star', '../../assets/star.png');
        this.load.image('bomb', '../../assets/bomb.png');
        this.load.spritesheet('dude',
            '../../assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('enemy',
            '../../assets/enemy.png',
            { frameWidth: 32, frameHeight: 48}
        );
    }

    // Metodo que se llama cuando se crea la escena y la renderiza
    create() {
        this._createWorld();
        this._cretatePlatforms();
        this._createPlayer();
        this._createEnemy();
        this._createStars();
        this._createScoreText();
        this._createCursors();
        this._createBombs();
        this._createColliders();

    }

    // Metodo que se llama cada que se refresca la pantalla
    update() {
        if (this.gameOver) return;
        this.player.handleMov(this.cursors);
        this.enemy.handleMov();
    }

    // Metodos auxiliares de la escena

    _createWorld() {
        this.add.image(400, 300, 'sky');
    }

    _cretatePlatforms() {
        // Se le asigna a las plataformas un grupo estatico (No se mueven ni afecta la gravedad
        // pero interactuan con demas objetos);
        this.platforms = this.physics.add.staticGroup();

        // Se crea en el x = 600, y = 400, se escala para que sea mas grande y siempre que se 
        // escale se debe de usar el refreshBody para que su colision se actualice
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

    }

    _createPlayer() {
        this.player = new Player(this,100,450);
    }

    _createEnemy() {
        // Se requiere que sean un grupo de enemys y aparte setear su spawn y puntos de spawn
        this.enemy = new Enemy(this,450,450, this.player);
    }

    _createStars() {
        // Grupo estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
    }

    _createScoreText() {
        // Texto
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }


    _createBombs() {
        // Grupo de las bombas
        this.bombs = this.physics.add.group();
    }


    _createColliders() {
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this._hitBomb, null, this);
        this.physics.add.overlap(this.player, this.stars, this._collectStar, null, this);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.player, this.enemy, this._hitPlayer, null, this);
        this.physics.add.overlap(this.player.attacks, this.enemy, this._hitEnemy, null, this);
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
            attack_up: Phaser.Input.Keyboard.KeyCodes.UP
        });
    }

    _collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    _hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player._stop();
        this.gameOver = true;
    }


    _hitPlayer(player, enemy) {
        this.physics.pause();
        player.setTint(0xff0000);
        player._stop();
        enemy._stop();
        this.gameOver = true;
    }

    // WARNING: PORQUE CHINGADOS AQUI ME LO TOMA EN ORDEN INVERSO?????????
    _hitEnemy(enemy, attack){
        enemy.disableBody(true, true);
    }
}

