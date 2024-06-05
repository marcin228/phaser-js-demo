import MenuScene from "./scenes/MenuScene";
import GameOverScene from "./scenes/GameOverScene";
import MainScene from "./scenes/MainScene";
import { Game, Types } from "phaser";
import GameConfigHelper from "./helpers/GameConfigHelper";

const gameConfig = new GameConfigHelper();

const config: Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: gameConfig.getScreenSize().width,
    height: gameConfig.getScreenSize().height,
    parent: 'game-container',
    backgroundColor: '#000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ MenuScene, MainScene, GameOverScene],
    physics: {
        default:'arcade',
        arcade:{
            gravity: {x:0, y:300},
            debug: false
        }
    }
};

export default new Game(config);
