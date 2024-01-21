class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("player", "../assets/temp_player.png");
  }

  create() {
    gameState.keys = this.input.keyboard.createCursorKeys();
    gameState.player = this.add.sprite(50, 50, "player");
    gameState.player.setScale(0.2);
  }

  update() {
    if (gameState.keys.left.isDown) {
      gameState.player.x -= 3;
    }

    if (gameState.keys.right.isDown) {
      gameState.player.x += 3;
    }

    if (gameState.keys.up.isDown) {
      gameState.player.y -= 3;
    }

    if (gameState.keys.down.isDown) {
      gameState.player.y += 3;
    }
  }
}
