import Phaser from "phaser";
import { Scene } from "phaser";

export default class LoadingScene extends Scene {
  constructor() {
    super("TitleScene");
  }

  create() {
    let centerX = this.cameras.main.centerX;
    let centerY = this.cameras.main.centerY;
    this.add
      .text(centerX, centerY - 25, "Your Title", {
        fontSize: "16px",
        fontWeight: "bold"
      })
      .setOrigin(0.5, 0.5);
    this.add
      .text(centerX, centerY + 12, "Click or touch to begin!", {
        fontSize: "10px"
      })
      .setOrigin(0.5, 0.5);

    this.input.on("pointerdown", () => {
      this.nextScene();
    });
  }

  nextScene() {
    this.scene.start("PlayScene");
  }
}
