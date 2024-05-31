import MenuScene from "./scenes/MenuScene";
import GameOverScene from "./scenes/GameOverScene";
import MainScene from "./scenes/MainScene";
import { Game, Types } from "phaser";

type ScreenSize = {
    width:number,
    height:number
}
const screenSize:ScreenSize = {width:1920, height:1080}

const config: Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: screenSize.width,
    height: screenSize.height,
    parent: 'game-container',
    backgroundColor: '#fff',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ MenuScene, MainScene, GameOverScene],
    physics: {
        default:'arcade',
        arcade:{
            gravity: {x:0,y:200},
            debug: true
        }
    }
};

export default new Game(config);
