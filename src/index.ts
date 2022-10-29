import Phaser from "phaser";
import GameScene from "./scenes/gameScene";

//const emoji = ['💩', '👯‍', '😸', '🏄', '🚀', '🔥', '🎉', '😄', '🦁'];
//console.log('😄',' activacion....');

const CANVAS_WIDTH: number = 800,
  CANVAS_HEIGHT: number = 600;

const config: Phaser.Types.Core.GameConfig = {
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300,
      },
      debug: true,
    },
  },
  scene: [GameScene],
};

export default new Phaser.Game(config);
