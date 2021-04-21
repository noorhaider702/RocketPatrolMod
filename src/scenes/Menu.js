class Menu extends Phaser.Scene {
  constructor() {
      super("menuScene");
  }

  preload() {
      // load audio
      this.load.audio('sfx_select', './assets/blip_select12.wav');
      this.load.audio('sfx_explosion', './assets/explosion38.wav');
      this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
      this.load.audio('skin', './assets/skin.wav');
      this.load.image('dnd', './assets/dnd.png');
  }

  create() {
      // menu text configuration
      let menuConfig = {
          fontFamily: 'Helvetica',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#9e1919',
          align: 'right',
          padding: {
              top: 5,
              bottom: 5,
          },
          fixedWidth: 0
      }
      
      // show menu text
      this.add.tileSprite(0, 0, 640, 480, 'dnd').setOrigin(0, 0);
      this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding -150, 'KANYE PATROL', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 +85, 'P1: Use ←→ arrows to move & (L) to fire', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width/2, game.config.height/2 +130, 'P2: Use A D  to move & (F) to fire', menuConfig).setOrigin(0.5);
      menuConfig.backgroundColor = '#d78dfc';
      menuConfig.color = '#000';
      this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 133, '← for Novice(1 player) or → for Expert(2 player)', menuConfig).setOrigin(0.5);

      // define keys
      keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
      keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // Novice mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000,
          players: 1    
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");   
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // Expert mode
        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 45000,
          players: 2
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");  
      }
    }
}