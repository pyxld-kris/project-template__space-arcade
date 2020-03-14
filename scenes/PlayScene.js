import Phaser from "phaser";

import Timer from "../classes/Timer.js";
import Asteroid from "../classes/Asteroid.js";
import Ship from "../classes/Ship.js";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
  }

  create() {
    // Start UIScene, which will layer on top of PlayScene
    this.scene.run("UIScene");

    let halfGameWidth = this.game.config.width / 2;
    let halfGameHeight = this.game.config.height / 2;
    this.camera = this.cameras.main;
    const cursors = this.input.keyboard.createCursorKeys();
    this.camera.setBounds(
      0,
      0,
      this.game.config.width,
      this.game.config.height
    );

    // Create background, and do really simple animation
    this.background = this.add
      .sprite(halfGameWidth, this.game.config.height, "background")
      .setOrigin(0.5, 1);
    clearTimeout(this.backgroundAnimInterval); // Keep animations from stacking up
    this.backgroundAnimInterval = setInterval(() => {
      //this.background.x -= 1;
      this.background.y += 1;
    }, 100);

    this.asteroid = new Asteroid(this, 100, 100);
    this.asteroid.setCollideWorldBounds(true);

    // Create the space ship
    this.ship = new Ship(
      this,
      this.game.config.width / 2,
      this.game.config.height - this.game.config.height / 8,
      40,
      40
    );
    //this.physics.add.collider(this.asteroid, this.rightPaddle);

    this.physics.add.collider([this.ship], this.asteroid);
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

  destroy() {
    clearTimeout(this.backgroundAnimInterval);
    super.destroy();
  }
}
