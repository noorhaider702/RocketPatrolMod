class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('yandhi', './assets/yandhi.png');
        this.load.image('spaceship', './assets/kanye.png');
        this.load.image('starfield', './assets/bg.PNG');
        this.load.image('bear', './assets/bear.png');
        this.load.audio('skin', './assets/skin.wav');
        this.load.audio('dead', './assets/dead.wav');
        this.load.audio('oof', './assets/oof.wav');
        this.load.audio('scoop', './assets/scoop.wav');
        this.load.audio('sway', './assets/sway.wav');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/kexplosion.png', {frameWidth: 62, frameHeight: 36, startFrame: 0, endFrame: 9});
        this.load.spritesheet('bexplosion', './assets/bexplosion.png', {frameWidth: 28, frameHeight: 28, startFrame: 0, endFrame: 9});
    }

    create() {   
        // place tile sprite 
        this.starfield = this.add.tileSprite(0, 0, 1808, 480, 'starfield').setOrigin(0, 0);
        this.music = this.sound.add('skin',  {
            volume: 0.3,
            loop:true
        }); 
        this.music.play();
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0x000000).setOrigin(0 ,0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x00000).setOrigin(0 ,0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0x00000).setOrigin(0 ,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x00000).setOrigin(0 ,0);

        // add Rocket (p1)
        if(game.settings.players == 2) {
            this.p2Rocket = new Rocket2(this, game.config.width - 200, game.config.height - borderUISize - borderPadding, 'yandhi').setOrigin(0.5, 0);
            this.p1Rocket = new Rocket(this, game.config.width - 400, game.config.height - borderUISize - borderPadding, 'yandhi').setOrigin(0.5, 0);
        }
        else {
            this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'yandhi').setOrigin(0.5, 0);
        }
        
        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'bear', 0, 40).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'bexplode',
            frames: this.anims.generateFrameNumbers('bexplosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.music.stop();
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        
        this.starfield.tilePositionX -= 4;  // update tile sprite
        
        if(!this.gameOver) {
            this.p1Rocket.update(); 
            if(game.settings.players == 2) { 
                this.p2Rocket.update();     
            }      // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(game.settings.players == 2) { 
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p2Rocket, this.ship02)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p2Rocket, this.ship01)) {
                this.p2Rocket.reset();
                this.shipExplode(this.ship01);
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        if(ship != this.ship02) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
            });
        } 
        if(ship == this.ship02) {
            let boom2 = this.add.sprite(ship.x, ship.y, 'bexplosion').setOrigin(0, 0);
            boom2.anims.play('bexplode');             // play explode animation
            boom2.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom2.destroy();                       // remove explosion sprite
            });
        } 
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        this.sound.play(Phaser.Math.RND.pick(['dead', 'oof', 'sway', 'scoop', 'sfx_explosion']));
        
      }
}