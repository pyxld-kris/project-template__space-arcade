import Phaser from "phaser";

import Timer from "../classes/Timer.js";
import Ball from "../classes/Ball.js";
import Ship from "../classes/Ship.js";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  preload() {}

  create() {
    this.camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    this.camera.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );

    this.ball = new Ball(this, 100, 100);
    this.ball.setCollideWorldBounds(true);

    // Create the space ship
    this.ship = new Ship(
      this,
      this.game.config.width / 2,
      this.game.config.height - this.game.config.height / 8,
      40,
      40
    );
    //this.physics.add.collider(this.ball, this.rightPaddle);

    this.physics.add.collider([this.ship], this.ball);
    /*
    this.add
      .text(0, 0, "Arrow keys to move paddles!", {
        font: "32px monospace",
        fill: "#ffffff",
        padding: { x: 1, y: 1 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
      */

    this.timer = new Timer(this, 20, 10);
  }

  update(time, delta) {}

  /* <Begin> helper functions added by Kris */
  //
  //

  generateRectangleSprite(width, height, color) {
    if (color === undefined) color = 0xffffff;

    // Returns key of generated sprite object
    let spriteKey = "rectangle-sprite-" + width + "x" + height;

    var graphics = this.add
      .graphics()
      .fillStyle(color)
      .fillRect(0, 0, width, height)
      .generateTexture(spriteKey, width, height);
    graphics.destroy();

    return spriteKey;
  }
  generateSquareSprite(width, color) {
    // Returns key of generated sprite object
    return this.generateRectangleSprite(width, width, color);
  }

  addPhysicalRectangle(x, y, width, height, color, alphaIThinkMaybe) {
    // TODO: alphaIThinkMaybe name change
    let rect = this.add.rectangle(x, y, width, height, color, alphaIThinkMaybe);
    rect = this.physics.add.existing(rect, true);

    return rect;
  }

  /* </End> Helper functions added by kris */
}
