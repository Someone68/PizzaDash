class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  checkCollision(sprite1, sprite2) {
    return Phaser.Geom.Intersects.RectangleToRectangle(
      sprite1.getBounds(),
      sprite2.getBounds()
    );
  }

  preload() {
    gameState.treePos = [
      { x: 30, y: 25 },
      { x: 120, y: 25 },
      { x: 10, y: 50 },
      { x: 90, y: 50 },
    ];
    this.load.image("tree", "../assets/tree.png");
    this.load.spritesheet("players", "../assets/player/player.png", {
      frameWidth: 384,
      frameHeight: 204,
    });
  }

  create() {
    gameState.keys = this.input.keyboard.createCursorKeys();
    gameState.player = this.add.sprite(50, 50, "player");
    gameState.player.setScale(0.2);
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("players", { start: 0, end: 3 }),
      frameRate: 60,
      repeat: -1,
    });
    gameState.player.anims.play("fly", true);
    for (let i = 0; i < gameState.treePos.length; i++) {
      const tree = this.add.sprite(
        gameState.treePos[i].x,
        gameState.treePos[i].y,
        "tree"
      );
      tree.setOrigin(0);
      tree.setScale(0.2);
    }
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
