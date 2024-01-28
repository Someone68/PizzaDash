class Shop extends Phaser.Scene {
  constructor() {
    super("Shop");
  }

  init() {
    gameState.GrayScaleShader = `
  precision mediump float;
  uniform vec2      resolution;
  uniform sampler2D uMainSampler;
  varying vec2 outTexCoord;
  void main(void) {
    vec4 color = texture2D(uMainSampler, outTexCoord);
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(gray, gray, gray, color.a);
  }
`;
  }

  preload() {
    this.load.image("shopbg", "../assets/shopbg.png");
    this.load.image("shopitem", "../assets/shopitem.png");
    this.load.image("boughtshopitem", "../assets/boughtshopitem.png");
    this.load.image("exit", "../assets/exit.png");
    this.load.image("lockedshopitem", "../assets/lockedshopitem.png");
    this.load.image("buyingshopitem", "../assets/buyingshopitem.png");
    this.load.image(
      "buyingnotenoughshopitem",
      "../assets/buyingnotenoughshopitem.png"
    );
  }

  create() {
    this.add.image(0, 0, "shopbg").setOrigin(0);
    gameState.shopscoretxt = this.add.text(3, 3, "$" + gameState.scor, {
      fontFamily: "pixel",
      fontSize: "20px",
      color: "yellow",
    });
    let exitbtn = this.add.sprite(718, 32, "exit").setOrigin(0.5);
    exitbtn.setInteractive();
    exitbtn.on("pointerup", () => {
      this.scene.start("Game");
    });
    this.add
      .text(375, 40, "PizzaDash Shop", {
        fontFamily: "pixel",
        fontSize: "25px",
      })
      .setOrigin(0.5);
    gameState.shopItems = [
      {
        name: "FedEx Shipping",
        desc: "um are they chucking the pakages now",
        code: () => {
          gameState.speed = 7;
        },
        cost: 20,
        bought: false,
        unlocked: true,
      },
      {
        name: "Temu Shipping",
        desc: "ok, now they are just chucking the packages 25ft away from the door.",
        code: () => {
          gameState.speed = 15;
        },
        cost: 70,
        bought: false,
        unlocked: false,
      },
      {
        name: "Inflation",
        desc: "get more money every delivery",
        code: () => {
          gameState.moneyget += 5;
        },
        cost: 50,
        bought: false,
        unlocked: false,
        multibuy: true,
      },
      {
        name: "More Employees",
        desc: "get +$5 every second",
        code: () => {
          setInterval(() => {
            gameState.scor += 5;
          }, 1000);
        },
        cost: 100,
        bought: false,
        unlocked: false,
        multibuy: true,
      },
    ];
    gameState.shopItemsSprites = [];
    gameState.shopItems.forEach((item, index) => {
      let shopItem = this.add.sprite(375, 110 + index * 100, "shopitem");
      if (item.bought) shopItem.setTexture("boughtshopitem");
      if (!item.unlocked) shopItem.setTexture("lockedshopitem");
      this.add
        .text(375, 110 + index * 100 - 7, item.name, {
          fontFamily: "pixel",
          fontSize: "20px",
        })
        .setOrigin(0.5);
      this.add
        .text(375, 110 + index * 100 + 9, item.desc, {
          fontFamily: "pixel",
          fontSize: "11px",
        })
        .setOrigin(0.5);
      shopItem.setInteractive();
      shopItem.on("pointerdown", () => {
        if (!item.bought && gameState.scor >= item.cost && item.unlocked) {
          console.log("buying");
          shopItem.setTexture("buyingshopitem");
        } else if (gameState.scor < item.cost) {
          console.log("buyingn");
          shopItem.setTexture("buyingnotenoughshopitem");
        }
      });
      shopItem.on("pointerup", () => {
        if (!item.bought && item.unlocked) {
          shopItem.setTexture("shopitem");
        }
        if (!item.bought && gameState.scor >= item.cost && item.unlocked) {
          item.code();
          gameState.scor -= item.cost;
          gameState.shopscoretxt.setText("$" + gameState.scor);
          if (!item.multibuy) item.bought = true;
          shopItem.setTexture("boughtshopitem");
          if (index < gameState.shopItems.length - 1)
            gameState.shopItems[index + 1].unlocked = true;
        }
      });
      gameState.shopItemsSprites.push(shopItem);
    });
  }

  update() {
    gameState.shopItems.forEach((item, index) => {
      if (item.bought)
        gameState.shopItemsSprites[index].setTexture("boughtshopitem");
      else if (!item.unlocked)
        gameState.shopItemsSprites[index].setTexture("lockedshopitem");
      else gameState.shopItemsSprites[index].setTexture("shopitem");
    });

    gameState.shopscoretxt.setText("$" + gameState.scor);
  }
}
