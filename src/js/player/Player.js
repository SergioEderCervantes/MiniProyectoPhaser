class Player extends AbsCharacter {
    constructor(scene, x, y) {
        super(scene, x, y, 'idle');
        this.nombreTextura = 'idle';
        this.leftAnim = 'left';
        this.rightAnim = 'run';
        this.turnAnim = 'turn';
        this.attackAnim = 'attack';
        this.dashAnim = 'dash';
        this.isAttacking = false;
        this.attacks = this.scene.physics.add.group();
        this.attackDir = '';
        this.isInvincible = false;
        // Cosas del dash
        this.isDashing = false;
        this.onDashingCooldown = false;
        this.cooldownStartTime = 0;
        this.cooldown = 2000;
        this._createAnimations();
    }

    // Metodos publicos
    getDashCooldwnProg() {
        if (!this.onDashingCooldown) return 0;
        let elapsed = this.scene.time.now - this.cooldownStartTime;
        return Phaser.Math.Clamp(1 - (elapsed / this.cooldown ), 0, 1);
    }

    handleMov(cursors) {
        // Si esta en medio de un dash no se puede hacer nada
        if (this.isDashing) return;
        const { left, right, up, attack_left, attack_right, attack_up, shift } = cursors;
        const dash = shift.isDown;
        // Mov Handling
        if (left.isDown && !this.isAttacking) {
            !dash ? this._movLeft() : this._dash(200, 200, -1);
        } else
        if (right.isDown && !this.isAttacking) {
            this._movRight();
            !dash ? this._movRight() : this._dash(200, 200, 1);
        } else if(!this.isAttacking && this.body.touching.down){
            this._stop();
        }
        if (up.isDown && this.body.touching.down) {
            this._jump();
        }

        //Atack handling
        // Mover el ataque siguiendo al jugador
        if (this.isAttacking) {
            this._movAttack();
        }
        if (attack_left.isDown) {
            this._attack('left');
            this.flipX = true;
        } else if (attack_right.isDown) {
            this._attack('right');
            this.flipX = false;
        } else if (attack_up.isDown) {
            this._attack('up');
        }
    }


    // Metodos privados
    _createAnimations() {
        
        this.scene.anims.create({
            key: this.attackAnim,
            frames: this.scene.anims.generateFrameNumbers(this.attackAnim, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0,
        });
        this.scene.anims.create({
            key: this.leftAnim,
            frames: this.scene.anims.generateFrameNumbers(this.rightAnim, { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: this.turnAnim,
            frames: this.scene.anims.generateFrameNumbers(this.nombreTextura, { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1,
           
        });

        this.scene.anims.create({
            key: this.rightAnim,
            frames: this.scene.anims.generateFrameNumbers(this.rightAnim, { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: this.dashAnim,
            frames: this.scene.anims.generateFrameNumbers(this.dashAnim, { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0,
        });

        

    }
    

    // Crea la accion de dash, con la distancia en px, duracion en ms y direccion 1 si es derecha, -1 si es izq
    _dash(distance, duration, direction){
        if(this.isDashing || this.onDashingCooldown) return;
        this.setVelocityX(0);

        this.isDashing = true;
        this.onDashingCooldown = true;
        this.cooldownStartTime = this.scene.time.now;
        
        // Aqui se pondria la animacion del dash
        this.anims.play(this.dashAnim, true);
        // Opcion dos
        const velocity = (distance/duration) * 1000; // Velocidad en pixeles por segundo
        this.setVelocityX(direction*velocity);
        // Acaba el dash
        this.scene.time.delayedCall(duration, () => {
            this.setVelocityX(0);
            this.isDashing = false;
            // Aqui se llamaria a la animacion de stop para parar la animacion de dash
            this.anims.play(this.turnAnim, true);
            // Delayed call para el cooldown
            this.scene.time.delayedCall(this.cooldown, () => this.onDashingCooldown = false);
        })

    }


    _movAttack() {
        this.attacks.children.iterate(child => {
            child.setVelocityX(this.body.velocity.x);
            child.setVelocityY(this.body.velocity.y);
        });
    }


    _attack(direction) {
        if (this.isAttacking) return;
        this.isAttacking = true;
        if (direction === 'left') {
            this.setVelocityX(-30);
        }
        else if(direction === 'right') {
            this.setVelocityX(30);
        }


        this.anims.play(this.attackAnim, true);

        // Configuraciones de la posicion y tamaño de las hitbox dependiendo de la direccion donde se ataca
        const hitboxConfig = {
            // WARNING: alch no entendi bien cual era la relacion entre el tamaño del hitbox y la 
            // posicion del mismo con respecto al cuerpo, si se quieren cambiar las hitbox ajustenlas 
            // para que se vea bien y no quede separada del player
            left: [
                { x: this.x - 34, y: this.y + 20, width: 32, height: 48 },
                { x: this.x - 28, y: this.y - 8, width: 45, height: 8 }
            ],
            right: [
                { x: this.x + 20, y: this.y + 20, width: 32, height: 48 },
                { x: this.x + 14, y: this.y - 8, width: 45, height: 8 }
            ],
            up: [
                { x: this.x - 5, y: this.y - 12, width: 32, height: 16 },
                { x: this.x - 25, y: this.y - 8, width: 8, height: 24 },
                { x: this.x + 15, y: this.y - 8, width: 8, height: 24 }
            ]
        };

        // Creacion de la hitbox del ataque
        const hitbox = hitboxConfig[direction].map(config => {
            const box = this.scene.physics.add.sprite(config.x, config.y, null).setSize(config.width, config.height);
            box.setVisible(false);
            return box;
        });

        this.attacks.addMultiple(hitbox);
        hitbox.forEach((e) => {
            // no se porque lo tuve que poner aca, en el map no sirve 
            e.body.setAllowGravity(false);
        })

        // Dependiendo de como se de la animacion de ataque y balanceo, se debe de cambiar estos dos timers
        // Tiempo que dura el ataque en milisegundos, despues de dichos, se destruye el ataque y se resetean atributos
        this.scene.time.delayedCall(400, () => {
            hitbox.forEach(e => e.destroy());
            this.attackDir = '';
        });
        // Tiempo hasta que se puede volver a atacar, se calcula como: este timer - timer anterior (por ejemplo: 1000 - 300 = 700 mSeg)
        this.scene.time.delayedCall(700, () => {
            this.isAttacking = false;
        });
    }
}
