const config = {
  type: Phaser.AUTO,
  width: 750,
  height: 500,
  parent: "gamecontainer",
  scene: [Menu, Game],
};

let game = new Phaser.Game(config);
