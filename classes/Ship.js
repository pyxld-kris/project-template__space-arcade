import Phaser from "phaser";
import Bullet from "./Bullet.js";

export default class Ship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "ship");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this, false); // second parameter is isStatic

    this.setCollideWorldBounds(true);

    this.setMaxVelocity(300, 300);
    this.setDrag(1000);
    this.setBounce(1, 1);

    // Track the arrow keys & OPQA
    const {
      LEFT,
      RIGHT,
      UP,
      DOWN,
      W,
      A,
      S,
      D
    } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN,
      w: W,
      a: A,
      s: S,
      d: D
    });

    // Hook into the game's update event
    scene.events.on("update", this.update, this);
    this.bulletTimeAccumulater = 0; // Stores seconds elapsed since last bullet, modified when firing. Used to determine when to fire bullets

    // set up ship-asteroid collisions
    scene.physics.add.collider(this, scene.asteroid, () => {
      //scene.scene.stop("PlayScene");
      //scene.scene.start("PlayScene");
      scene.scene.restart("PlayScene");
    });

    console.log("MAKING SHIP");
  }

  update(time, delta) {
    const keys = this.keys; // store for easy access

    // Up/down controls
    if (keys.up.isDown || keys.w.isDown) {
      this.setVelocityY(-200);
    } else if (keys.down.isDown || keys.s.isDown) {
      this.setVelocityY(200);
    }

    // Let/right controls
    if (keys.left.isDown || keys.a.isDown) {
      this.setVelocityX(-200);
    } else if (keys.right.isDown || keys.d.isDown) {
      this.setVelocityX(200);
    }

    // Fire a bullet every half second
    this.bulletTimeAccumulater += delta;
    if (this.bulletTimeAccumulater > 250) {
      this.bulletTimeAccumulater = 0;
      new Bullet(this.scene, this.x, this.y - 20);
    }
  }

  destroy() {
    if (this.scene)
      // sometimes scene is undefined when in the process of restarting?
      this.scene.events.off("update", this.update, this);
    super.destroy();
  }
}
