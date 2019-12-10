import Phaser from "phaser";

export default class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, scene.generateSquareSprite(100, 0xff0000));
    this.scene = scene;

    this.scale = 1;
    this.maxVelocity = 100;

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this);

    this.setDrag(0, 0)
      .setMaxVelocity(this.maxVelocity, this.maxVelocity)
      .setBounce(3.2, 1);

    this.setVelocity(100, 100);
  }

  bulletHit() {
    this.maxVelocity += 20;
    this.setMaxVelocity(this.maxVelocity, this.maxVelocity);

    this.scale -= 0.025;
    this.setScale(this.scale);

    if (this.scale < 0.2) {
      this.scene.timer.stop();
      this.destroy();
    }
  }

  update() {}

  destroy() {
    super.destroy();
  }
}
