class HowPlay extends Phaser.Scene {
  constructor() {
    super("HowPlay");
  }

  preload() {
    this.load.image("button", "../assets/button.png");
    this.load.image("bg", "../assets/bg.png");
    this.load.image("wasd", "../assets/wasd.png");
    this.load.image("arrow", "../assets/arrow.png");
  }

  create() {
    let background = this.add.image(375, 250, "bg").setOrigin(0.5);
    background.setScale(1.02);
    const title = this.add.text(375, 30, "PizzaDash", {
      fontFamily: "pixel",
      fontSize: "30px",
    });
    title.setOrigin(0.5);
    gameState.startGame = this.add.sprite(660, 450, "button");
    const startGameText = this.add.text(660, 450, "Play", {
      fontFamily: "pixel",
      fontSize: "20px",
    });
    startGameText.setOrigin(0.5);
    gameState.startGame.setInteractive();
    gameState.startGame.on("pointerup", () => {
      this.scene.start("Game");
    });

    this.add.text(
      20,
      50,
      `Deliver pizza as fast as possible with drone delivery.
Use the arrow keys or WASD to move the drone. Obtain a package by visiting
the house on the left. Deliver your packages to the house on the right.
Earn score by delivering pizza, and visit the shop for more upgrades
to deliver more pizza.`,
      {
        fontFamily: "pixel",
        fontSize: "14px",
      }
    );
    this.add.image(187, 270, "wasd");
    this.add.image(563, 270, "arrow");
  }
}
