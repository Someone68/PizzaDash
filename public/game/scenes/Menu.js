class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("button", "../assets/button.png");
    this.load.image("bg", "../assets/bg.png");
  }

  create() {
    this.add.image(-9, 10, "bg").setOrigin(0);
    const title = this.add.text(375, 200, "PizzaDash", {
      fontFamily: "pizza",
      fontSize: "30px",
    });
    title.setOrigin(0.5);
    gameState.startGame = this.add.sprite(375, 250, "button");
    const startGameText = this.add.text(375, 250, "Start", {
      fontFamily: "pizza",
      fontSize: "20px",
    });
    startGameText.setOrigin(0.5);
    gameState.startGame.setInteractive();
    gameState.startGame.on("pointerup", () => {
      this.scene.start("HowPlay");
    });
  }
}
