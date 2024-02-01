class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("button", "../assets/button.png");
    this.load.image("bg", "../assets/bg.png");
    this.load.audio("music", "../assets/pizzabgmusic.mp3");
  }

  create() {
    // gameState.backgroundMusic = this.sound.add("music", { loop: true });
    // gameState.backgroundMusic.play();
    let background = this.add.image(375, 250, "bg").setOrigin(0.5);
    background.setScale(1.02);
    const title = this.add.text(375, 200, "PizzaDash", {
      fontFamily: "pixel",
      fontSize: "30px",
    });
    title.setOrigin(0.5);
    gameState.startGame = this.add.sprite(375, 250, "button");
    const startGameText = this.add.text(375, 250, "Start", {
      fontFamily: "pixel",
      fontSize: "20px",
      antialias: false,
      color: "white",
    });
    startGameText.setOrigin(0.5);
    gameState.startGame.setInteractive();
    gameState.startGame.on("pointerup", () => {
      // gameState.backgroundMusic.pause();
      this.scene.start("HowPlay");
    });
  }
}
