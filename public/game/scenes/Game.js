class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {}

  create() {
    this.add.circle(50, 50, 50, 0x32a852);
  }

  update() {}
}
