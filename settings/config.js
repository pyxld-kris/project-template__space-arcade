import Phaser from "phaser";
import PlayScene from "/scenes/PlayScene.js";

export var config = {
  type: Phaser.AUTO,
  width: 300,
  height: 500,
  parent: "game-container",
  pixelArt: true,
  zoom: 1,
  backgroundColor: "#000000",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  }
};
