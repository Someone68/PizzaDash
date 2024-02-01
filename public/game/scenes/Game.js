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
      { x: 530, y: 280 },
      { x: 620, y: 280 },
      { x: 710, y: 280 },
      { x: 560, y: 295 },
      { x: 650, y: 295 },
    ];
    this.load.image("gamebg", "../assets/gamebg.png");
    this.load.image("tree", "../assets/tree.png");
    this.load.image("house", "../assets/house.png");
    this.load.image("pizzahouse", "../assets/pizzahouse.png");
    this.load.image("pizza", "../assets/pizzaslice.png");
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
    //music
    // gameState.backgroundMusic.play();

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
    gameState.scoreText.setDepth(9900);

    //top text
    gameState.topText = this.add.text(375, 40, "Welcome to PizzaDash!", {
      fontFamily: "pixel",
      antialias: false,
      color: "white",
      fontSize: 17,
      antialias: false,
    });
    gameState.topText.setOrigin(0.5);
    gameState.topText.setDepth(10000);

    //pizzahouse
    gameState.pizzahouse = this.add.sprite(-120, 150, "pizzahouse");
    gameState.pizzahouse.setDepth(300);
    gameState.pizzahouse.setOrigin(0);
    gameState.pizzahouse.setScale(0.5);
    let pizza = this.add.image(65, 300, "pizza").setOrigin(0);
    pizza.setDepth(400);
    pizza.setScale(0.15);

    //house
    gameState.house = this.add.sprite(600, 40, "house");
    gameState.house.setDepth(500);
    gameState.house.setOrigin(0);
    gameState.house.setScale(0.4);

    //player
    gameState.player = this.add.sprite(50, 350, "player");
    gameState.player.setScale(0.2);
    gameState.player.setDepth(1000);

    //devtools
    if (gameState.DEV_MODE) {
      gameState.devtools.shop = this.add
        .text(150, 500, "[dev] open shop")
        .setOrigin(1);
      gameState.devtools.shop.setInteractive();
      gameState.devtools.shop.on("pointerup", () => {
        // gameState.backgroundMusic.pause();
        this.scene.start("Shop");
      });

      gameState.devtools.x10 = this.add
        .text(100, 480, "[dev] x10")
        .setOrigin(1);
      gameState.devtools.x10.setInteractive();
      gameState.devtools.x10.on("pointerup", () => {
        gameState.scor *= 10;
      });

      gameState.devtools.money = this.add
        .text(550, 480, "[dev] +∞")
        .setOrigin(1);
      gameState.devtools.money.setInteractive();
      gameState.devtools.money.on("pointerup", () => {
        gameState.scor = Infinity;
      });

      gameState.devtools.money = this.add
        .text(250, 480, "[dev] x100")
        .setOrigin(1);
      gameState.devtools.money.setInteractive();
      gameState.devtools.money.on("pointerup", () => {
        gameState.scor *= 100;
      });

      gameState.devtools.money = this.add
        .text(400, 480, "[dev] x1000")
        .setOrigin(1);
      gameState.devtools.money.setInteractive();
      gameState.devtools.money.on("pointerup", () => {
        gameState.scor *= 1000;
      });

      gameState.devtools.money = this.add
        .text(100, 460, "[dev] +1")
        .setOrigin(1);
      gameState.devtools.money.setInteractive();
      gameState.devtools.money.on("pointerup", () => {
        gameState.scor += 1;
      });

      gameState.devtools.ruin = this.add
        .text(500, 500, "[dev] ruin the fun")
        .setOrigin(1);
      gameState.devtools.ruin.setInteractive();
      gameState.devtools.ruin.on("pointerup", () => {
        gameState.scor += 1;
        gameState.speed = 50;
        setInterval(() => {
          gameState.scor *= 1.1;
          gameState.moneyget *= 1.05;
          gameState.carryingPkg = true;
        }, 20);
      });
    }

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
      gameState.trees[i].setDepth(i + 1);
      if (i === 0) {
        gameState.trees[i].setInteractive();
        gameState.trees[i].on("pointerup", () => {
          gameState.DEV_MODE = true;
          alert(
            "-=|| Developer Mode ||=-\nDeveloper mode was enabled. Please be responsible.\nI do not condone or endorse cheating and hacking in any way. These tools were made for testing purposes (and MAYBE some fun) only."
          );
          this.scene.restart();
        });
      }

      let pizza1 = this.add
        .image(
          gameState.treePos[i].x + 20,
          gameState.treePos[i].y + 30,
          "pizza"
        )
        .setScale(0.04);
      pizza1.setOrigin(0);
      pizza1.setDepth(i + 2);

      let pizza2 = this.add
        .image(
          gameState.treePos[i].x + 60,
          gameState.treePos[i].y + 70,
          "pizza"
        )
        .setScale(0.04);
      pizza2.setOrigin(0);
      pizza2.setDepth(i + 3);

      let pizza3 = this.add
        .image(
          gameState.treePos[i].x + 30,
          gameState.treePos[i].y + 80,
          "pizza"
        )
        .setScale(0.04);
      pizza3.setOrigin(0);
      pizza3.setDepth(i + 4);
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
      // gameState.backgroundMusic.pause();
      this.scene.start("Shop");
    }

    gameState.scoreText.setText("$" + gameState.scor);

    if (!gameState.tempTopText) {
      gameState.topText.setText(gameState.currentTopText);
    }
  }
}
