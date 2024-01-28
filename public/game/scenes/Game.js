class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  temp(sprite, txt, style = {}) {
    // Create a text object above the player
    let text = this.add.text(sprite.x, sprite.y - 20, txt, style);
    text.setOrigin(0.5);

    // Create a tween to make the text float up and fade away
    this.tweens.add({
      targets: text,
      y: text.y - 50,
      alpha: 0,
      duration: 2000, // Adjust the duration as needed
      ease: "Linear",
      onComplete: function () {
        // Remove the text when the tween is complete
        text.destroy();
      },
    });
  }

  checkCollision(sprite1, sprite2) {
    return Phaser.Geom.Intersects.RectangleToRectangle(
      sprite1.getBounds(),
      sprite2.getBounds()
    );
  }

  move(sprite, dx, dy) {
    sprite.x += dx;
    sprite.y += dy;
  }

  preventOverlap(sprite1, sprite2) {
    var bounds1 = sprite1.getBounds();
    var bounds2 = sprite2.getBounds();

    var overlapX = Math.max(
      0,
      Math.min(bounds1.right, bounds2.right) - Math.max(bounds1.x, bounds2.x)
    );
    var overlapY = Math.max(
      0,
      Math.min(bounds1.bottom, bounds2.bottom) - Math.max(bounds1.y, bounds2.y)
    );

    if (overlapX > overlapY) {
      // Adjust vertically
      if (bounds1.y < bounds2.y) {
        sprite1.y -= overlapY;
      } else {
        sprite1.y += overlapY;
      }
    } else {
      // Adjust horizontally
      if (bounds1.x < bounds2.x) {
        sprite1.x -= overlapX;
      } else {
        sprite1.x += overlapX;
      }
    }
  }

  preload() {
    gameState.treePos = [
      { x: 30, y: 20 },
      { x: 120, y: 20 },
      { x: 210, y: 20 },
      { x: 75, y: 35 },
      { x: 165, y: 35 },
      { x: 255, y: 35 },
    ];
    this.load.image("gamebg", "../assets/gamebg.png");
    this.load.image("tree", "../assets/tree.png");
    this.load.image("house", "../assets/house.png");
    this.load.image("pizzahouse", "../assets/pizzahouse.png");
    this.load.spritesheet("players", "../assets/player/player.png", {
      frameWidth: 384,
      frameHeight: 204,
    });
    this.load.spritesheet("playerpkgs", "../assets/player/playerpackage.png", {
      frameWidth: 384,
      frameHeight: 204,
    });
  }

  create() {
    //create cursor keys
    gameState.keys = this.input.keyboard.createCursorKeys();
    gameState.morekeys = this.input.keyboard.addKeys("W,S,A,D,E");

    //create background
    this.add.image(0, 0, "gamebg").setOrigin(0);

    //create sprites
    //score text
    gameState.scoreText = this.add.text(10, 10, "$" + gameState.scor, {
      fontFamily: "pixel",
      color: "yellow",
      fontSize: 20,
      antialias: false,
    });
    gameState.scoreText.setOrigin(0);
    gameState.scoreText.setDepth(99);

    //top text
    gameState.topText = this.add.text(375, 40, "Welcome to PizzaDash!", {
      fontFamily: "pixel",
      antialias: false,
      color: "white",
      fontSize: 17,
      antialias: false,
    });
    gameState.topText.setOrigin(0.5);
    gameState.topText.setDepth(100);

    //pizzahouse
    gameState.pizzahouse = this.add.sprite(-120, 150, "pizzahouse");
    gameState.pizzahouse.setDepth(2);
    gameState.pizzahouse.setOrigin(0);
    gameState.pizzahouse.setScale(0.5);

    //house
    gameState.house = this.add.sprite(600, 40, "house");
    gameState.house.setDepth(3);
    gameState.house.setOrigin(0);
    gameState.house.setScale(0.4);

    //player
    gameState.player = this.add.sprite(50, 350, "player");
    gameState.player.setScale(0.2);
    gameState.player.setDepth(10);

    //devtools
    gameState.devtools.shop = this.add
      .text(100, 500, "[dev] open shop")
      .setOrigin(1);
    gameState.devtools.shop.setInteractive();
    gameState.devtools.shop.on("pointerup", () => {
      this.scene.start("Shop");
    });

    //create animations
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("players", { start: 0, end: 3 }),
      frameRate: 60,
      repeat: -1,
    });

    this.anims.create({
      key: "flypkg",
      frames: this.anims.generateFrameNumbers("playerpkgs", {
        start: 0,
        end: 3,
      }),
      frameRate: 60,
      repeat: -1,
    });

    //play animations
    if (!gameState.carryingPkg) gameState.player.anims.play("fly", true);
    else gameState.player.anims.play("flypkg", true);

    //create trees
    gameState.trees = [];
    for (let i = 0; i < gameState.treePos.length; i++) {
      gameState.trees[i] = this.add.sprite(
        gameState.treePos[i].x,
        gameState.treePos[i].y,
        "tree"
      );
      gameState.trees[i].setOrigin(0);
      gameState.trees[i].setScale(0.2);
      gameState.trees[i].setDepth(1);
    }
  }

  update() {
    //manage player movement
    if (gameState.keys.left.isDown || gameState.morekeys.A.isDown) {
      this.move(gameState.player, gameState.speed * -1, 0);
    }

    if (gameState.keys.right.isDown || gameState.morekeys.D.isDown) {
      this.move(gameState.player, gameState.speed, 0);
    }

    if (gameState.keys.up.isDown || gameState.morekeys.W.isDown) {
      this.move(gameState.player, 0, gameState.speed * -1);
    }

    if (gameState.keys.down.isDown || gameState.morekeys.S.isDown) {
      this.move(gameState.player, 0, gameState.speed);
    }

    if (gameState.player.x < 0) {
      gameState.player.x = 0;
    }
    if (gameState.player.x > 750) {
      gameState.player.x = 750;
    }
    if (gameState.player.y < 0) {
      gameState.player.y = 0;
    }
    if (gameState.player.y > 500) {
      gameState.player.y = 500;
    }
    if (this.checkCollision(gameState.player, gameState.pizzahouse)) {
      if (!gameState.carryingPkg) {
        gameState.player.play("flypkg");
        gameState.carryingPkg = true;
      }

      if (gameState.scor >= 1) {
        gameState.tempTopText = true;
        gameState.topText.setText("[E] Open Shop");
      }
    } else {
      gameState.tempTopText = false;
    }
    if (this.checkCollision(gameState.player, gameState.house)) {
      if (gameState.carryingPkg) {
        gameState.player.play("fly");
        gameState.carryingPkg = false;
        gameState.scor += gameState.moneyget;
        this.temp(gameState.player, `+${gameState.moneyget}`, {
          fontFamily: "pixel",
        });
      }
    }
    if (
      gameState.morekeys.E.isDown &&
      this.checkCollision(gameState.player, gameState.pizzahouse) &&
      gameState.scor >= 1
    ) {
      this.scene.start("Shop");
    }

    gameState.scoreText.setText("$" + gameState.scor);

    if (!gameState.tempTopText) {
      gameState.topText.setText(gameState.currentTopText);
    }
  }
}
