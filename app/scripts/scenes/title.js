export default class Title extends Phaser.Scene {
  /**
   *  My custom scene.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    super({ key: 'Title' });
  }

  /**
   *  Called when this scene is initialized.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  init(/* data */) {}

  /**
   *  Used to declare game assets to be loaded using the loader plugin API.
   *
   *  @protected
   */
  preload() {}

  /**
   *  Responsible for setting up game objects on the screen.
   *
   *  @protected
   *  @param {object} [data={}] - Initialization parameters.
   */
  create(/* data */) {
    const x = this.cameras.main.width / 2;
    const y = this.cameras.main.height / 2;
    this.add.image(x, y, 'bg');
    this.add.image(x, 325, 'toe-beans');

    //  Add the 'Catastrophe' logo.
    const logo = this.add.image(x, 175, 'logo');
    this.tweens.add({
      targets: logo,
      y: 225,
      duration: 1700,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });

    //  Adds grass across screen in tile: x, y, width, height, imageKey
    this.add.tileSprite(400,538,800,128, 'grass');

    //  Add a text label.
    const label = this.add.text(x, 550, 'START!', {
      font: '45px Helvetica',
      color: '#7a4621',
      stroke: 'white',
      strokeThickness: 4,
    });

    //  Move the origin point to the center, make the label interactive.
    label.setOrigin(0.5, 0.5).setInteractive();

    //  When this label is clicked, move on to the next game scene.
    label.on('pointerup', () => this.scene.start('Game'));
  }

  /**
   *  Handles updates to game logic, physics and game objects.
   *
   *  @protected
   *  @param {number} t - Current internal clock time.
   *  @param {number} dt - Time elapsed since last update.
   */
  update(/* t, dt */) {}

  /**
   *  Called after a scene is rendered. Handles rendenring post processing.
   *
   *  @protected
   */
  render() {}

  /**
   *  Called when a scene is about to shut down.
   *
   *  @protected
   */
  shutdown() {}

  /**
   *  Called when a scene is about to be destroyed (i.e.: removed from scene
   *  manager). All allocated resources that need clean up should be freed up
   *  here.
   *
   *  @protected
   */
  destroy() {}
}
