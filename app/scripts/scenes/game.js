// import Logo from '@/objects/logo';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({ key: 'Game' });
    // this.player = null;
    // this.platforms = null;
    this.score = -100;
    // this.scoreText = '';
    // this.gameOver = false;
  }

  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */

  create(/* data */) {
    //  TODO: Replace this content with really cool game code here :)
    // const x = this.cameras.main.width / 2;
    // const y = this.cameras.main.height / 2;
    this.mountain = this.add.tileSprite(0, 0, 800, 600, 'bg').setOrigin(0);

    this.ground = this.physics.add.staticGroup();

    this.ground.create(400, 538, 'grass').refreshBody();
    // var groundData = [];

    this.grass = this.add.tileSprite(400, 538, 800, 129, 'grass');

    this.anims.create({
      key: 'idle',
      frames: [
        { key: 'idle1' },
        { key: 'idle2' },
        { key: 'idle3' },
        { key: 'idle4' },
        { key: 'idle5' },
        { key: 'idle6' },
        { key: 'idle7' },
        { key: 'idle8' },
        { key: 'idle9' },
        { key: 'idle10', duration: 100 },
      ],
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'run',
      frames: [
        { key: 'run1' },
        { key: 'run2' },
        { key: 'run3' },
        { key: 'run4' },
        { key: 'run5' },
        { key: 'run6' },
        { key: 'run7' },
        { key: 'run8', duration: 100 },
      ],
      frameRate: 13,
      repeat: -1,
    });

    this.anims.create({
      key: 'jump',
      frames: [
        { key: 'jump1' },
        { key: 'jump2' },
        { key: 'jump3' },
        { key: 'jump4' },
        { key: 'jump5' },
        { key: 'jump6' },
        { key: 'jump7' },
        { key: 'jump8', duration: 100 },
      ],
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'fall',
      frames: [
        { key: 'fall1' },
        { key: 'fall2' },
        { key: 'fall3' },
        { key: 'fall4' },
        { key: 'fall5' },
        { key: 'fall6' },
        { key: 'fall7' },
        { key: 'fall8', duration: 100 },
      ],
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'dead',
      frames: [
        { key: 'dead1' },
        { key: 'dead2' },
        { key: 'dead3' },
        { key: 'dead4' },
        { key: 'dead5' },
        { key: 'dead6' },
        { key: 'dead7' },
        { key: 'dead8' },
        { key: 'dead9' },
        { key: 'dead10', duration: 100 },
      ],
      frameRate: 15,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(158, 310, 'idle1').setScale(0.3);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.ground);

    this.add.image(690, 35, 'scoreboard').setScale(0.25);

    this.scoreText = this.add.text(675, 18, '0', {
      fontSize: '30px',
      fill: '#fff',
    });

    //Preventing double jump off stars
    this.startY = this.player.y;

    if (this.player.y != this.startY) {
      return;
    }

    // this.shroom = this.physics.add.group({
    //   key: 'mushroom',
    //   repeat: 6,
    //   setXY: { x: 50, y: 0, stepX: 100 },
    // });

    // this.shroom.children.iterate(child => {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    // this.physics.add.collider(this.shroom, this.ground);

    this.makeCrates();
  }

  makeCrates() {
    this.score += 100;
    this.scoreText.setText(this.score);
    this.crates = this.physics.add.group({
      key: 'crate',
      repeat: Math.floor(Math.random() * 2 + 1),
      setXY: { x: 700, y: 150, stepY: 100 },
    });

    this.crates.children.iterate(crate => {
      crate.setVelocityX(-100);
    });

    this.physics.add.collider(this.player, this.crates);
    this.physics.add.collider(this.crates);
    this.physics.add.collider(this.crates, this.ground);
  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
    var crateExist = this.crates.getChildren()[0];
    if (crateExist.x < 0 || crateExist.x > 800) {
      this.makeCrates();
    }

    this.mountain.tilePositionX += 2;
    this.grass.tilePositionX += 2;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.startY = this.player.y;
    if (this.cursors.left.isDown && !this.cursors.space.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('run', true);
    } else if (this.cursors.right.isDown && !this.cursors.space.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('run', true);
    } else if (this.cursors.space.isDown) {
      this.player.anims.play('jump', true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('run', true);
    }

    if (this.cursors.space.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    //to load 'Game Over'
    //this.scene.start('GameOver');
    //probably stop gameplay music
  }
}
