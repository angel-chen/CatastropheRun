export default class SplashScreen extends Phaser.Scene {
  /**
   *  Takes care of loading the main game assets, including textures, tile
   *  maps, sound effects and other binary files, while displaying a busy
   *  splash screen.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({
      key: 'SplashScreen',

      //  Splash screen and progress bar textures.
      pack: {
        files: [
          {
            key: 'splash-screen',
            type: 'image',
          },
          {
            key: 'progress-bar',
            type: 'image',
          },
        ],
      },
    });
  }

  /**
   *  Show the splash screen and prepare to load game assets.
   *
   *  @protected
   */
  preload() {
    //  Display cover and progress bar textures.
    this.showCover();
    this.showProgressBar();

    //  HINT: Declare all game assets to be loaded here.
    this.load
      .image('logo', 'catastrophe.png')
      .image('bg', 'BG.png')
      .image('toe-beans', 'toe-beans.png')
      .image('grass', 'grass.png')
      .image('clouds', 'clouds.png');

    this.load.path = 'assets/sprite-cat/idle/';

    this.load.image('idle1', 'idle-01.png');
    this.load.image('idle2', 'idle-02.png');
    this.load.image('idle3', 'idle-03.png');
    this.load.image('idle4', 'idle-04.png');
    this.load.image('idle5', 'idle-05.png');
    this.load.image('idle6', 'idle-06.png');
    this.load.image('idle7', 'idle-07.png');
    this.load.image('idle8', 'idle-08.png');
    this.load.image('idle9', 'idle-09.png');
    this.load.image('idle10', 'idle-10.png');

    this.load.path = 'assets/sprite-cat/run/';

    this.load.image('run1', 'run-01.png');
    this.load.image('run2', 'run-02.png');
    this.load.image('run3', 'run-03.png');
    this.load.image('run4', 'run-04.png');
    this.load.image('run5', 'run-05.png');
    this.load.image('run6', 'run-06.png');
    this.load.image('run7', 'run-07.png');
    this.load.image('run8', 'run-08.png');

    this.load.path = 'assets/sprite-cat/jump/';

    this.load.image('jump1', 'jump-01.png');
    this.load.image('jump2', 'jump-02.png');
    this.load.image('jump3', 'jump-03.png');
    this.load.image('jump4', 'jump-04.png');
    this.load.image('jump5', 'jump-05.png');
    this.load.image('jump6', 'jump-06.png');
    this.load.image('jump7', 'jump-07.png');
    this.load.image('jump8', 'jump-08.png');

    this.load.path = 'assets/sprite-cat/fall/';

    this.load.image('fall1', 'fall-01.png');
    this.load.image('fall2', 'fall-02.png');
    this.load.image('fall3', 'fall-03.png');
    this.load.image('fall4', 'fall-04.png');
    this.load.image('fall5', 'fall-05.png');
    this.load.image('fall6', 'fall-06.png');
    this.load.image('fall7', 'fall-07.png');
    this.load.image('fall8', 'fall-08.png');

    this.load.path = 'assets/sprite-cat/dead/';

    this.load.image('dead1', 'dead-01.png');
    this.load.image('dead2', 'dead-02.png');
    this.load.image('dead3', 'dead-03.png');
    this.load.image('dead4', 'dead-04.png');
    this.load.image('dead5', 'dead-05.png');
    this.load.image('dead6', 'dead-06.png');
    this.load.image('dead7', 'dead-07.png');
    this.load.image('dead8', 'dead-08.png');
    this.load.image('dead9', 'dead-09.png');
    this.load.image('dead10', 'dead-10.png');
  }

  /**
   *  Set up animations, plugins etc. that depend on the game assets we just
   *  loaded.
   *
   *  @protected
   */
  create() {
    //  We have nothing left to do here. Start the next scene.
    this.scene.start('Title');
  }

  //  ------------------------------------------------------------------------

  /**
   *  Show the splash screen cover.
   *
   *  @private
   */
  showCover() {
    this.add.image(0, 0, 'splash-screen').setOrigin(0);
  }

  /**
   *  Show the progress bar and set up its animation effect.
   *
   *  @private
   */
  showProgressBar() {
    //  Get the progress bar filler texture dimensions.
    const { width: w, height: h } = this.textures.get('progress-bar').get();

    //  Create a shape to use as a mask for our progress bar filler.
    const mask = this.add.graphics();

    //  Place the filler texture on the progress bar "hole" of the splash
    //  screen.
    const img = this.add.sprite(82, 282, 'progress-bar').setOrigin(0);

    //  Apply the mask and move the shape at the same coordinates of the
    //  filler texture.
    img.mask = new Phaser.Display.Masks.GeometryMask(this, mask);
    mask.setPosition(img.x, img.y);

    //  Given how many files have been loaded, paint the shape mask to reveal
    //  more of the filler, giving the progress bar its animation effect.
    this.load.on('progress', v => mask.fillRect(0, 0, Math.ceil(v * w), h));
  }
}
