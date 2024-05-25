import { Boot } from './scenes/Boot';
import { Game as GameScene} from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { Menu } from './scenes/Menu';
import { Preloader } from './scenes/Preloader';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#fff',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        Menu,
        GameScene,
        GameOver
    ]
};

export default new Game(config);
