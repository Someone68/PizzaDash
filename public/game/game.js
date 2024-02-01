const config = {
  type: Phaser.AUTO,
  width: 750,
  height: 500,
  parent: "gamecontainer",
  pixelArt: true,
  scene: [Menu, HowPlay, Game, Shop],
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
  },
  audio: {
    disableWebAudio: true, // disable Web Audio API if needed
  },
};

let game = new Phaser.Game(config);
