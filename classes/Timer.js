/**
 * @author       Kris Gano <kris@pyxld.com>
 * @copyright    2019 Dev Launchers
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Phaser from "phaser";

export default class Timer extends Phaser.GameObjects.Text {
  constructor(scene, x, y, style) {
    // Set our default style here, and allow the passed in style parameter to overwrite any of these
    style = style ? style : {};
    style.fontSize = style.fontSize ? style.fontSize : "32px";
    style.fontFamily = style.fontFamily ? style.fontFamily : '"Press Start 2P"';
    style.align = style.align ? style.align : "center";
    style.fill = style.fill ? style.fill : "#ffffff";
    style.padding = style.padding ? style.padding : { x: 1, y: 1 };
    style.backgroundColor = style.backgroundColor
      ? style.backgroundColor
      : "transparent";

    super(scene, x, y, 0, style);

    this.scene = scene;

    this.currentTime = 0;

    scene.add.existing(this);

    this.setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5) // Makes text more crisp
      .setDepth(100); // Keeps text in front of other objects

    this.start();
  }

  stop() {
    this.timer.remove();
  }
  start() {
    // Set up a phaser timer to increment this display every 1 second
    this.timer = this.scene.time.addEvent({
      delay: 1000, // ms
      callback: this.updateDisplay,
      //args: [],
      callbackScope: this,
      loop: true
    });
  }

  updateDisplay() {
    this.currentTime++;
    this.setText(this.currentTime);
  }

  destroy() {
    // Call this object's parent class destroy method
    super.destroy();
  }
}
