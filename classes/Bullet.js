import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this);

    this.setDrag(0, 0)
      .setMaxVelocity(0, 800)
      .setBounce(3.2, 1);

    this.setVelocity(0, -300);

    // Hook into the game's update event
    scene.events.on("update", this.update, this);

    // Set up collisions with asteroid
    scene.physics.add.collider(this, scene.asteroid, () => {
      this.scene.camera.shake(50, 0.02);
      this.scene.asteroid.bulletHit();
      this.destroy();
    });
  }

  update() {
    if (this.y < 0) {
      this.destroy();
    }
  }

  destroy() {
    if (this.scene)
      // sometimes scene is undefined when in the process of restarting?
      this.scene.events.off("update", this.update, this);
    super.destroy();
  }
}
