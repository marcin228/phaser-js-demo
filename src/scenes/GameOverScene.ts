import { Scene } from 'phaser';
import ScreenHelper from '../helpers/ScreenHelper';
import ControlsHelper from '../helpers/ControlsHelper';

export default class GameOverScene extends Scene{

    private endScreen:Phaser.GameObjects.Image;
    private gameOver:Phaser.GameObjects.Image;

    constructor (){
    
        super('GameOverScene');
    }

    preload(){

        this.load.image('endScreen', 'assets/img/background02.png');
        this.load.image('gameOver', 'assets/img/gameover.png');
    }

    create(){

        const screen = ScreenHelper.getScreenDimensions(this);

        this.endScreen = this.add.image(0, 0, 'endScreen').setOrigin(0, 0).setDisplaySize(screen.width, screen.height);
        this.gameOver = this.add.image(screen.width / 2, 0, 'gameOver').setOrigin(0.5, 0);
        this.gameOver.alpha = 0;
        this.gameOver.scale = 0.3;

        this.tweens.add({
            
            targets: this.gameOver,
            alpha: 1,
            scale: 1,
            y: screen.height / 3,
            ease: 'Power1',
            duration: 2000,
            repeat: 0,
            onStart: () => {},
            onComplete: () => {}
        })

        ControlsHelper.gotoSceneOnPointerDownOrSpace('MenuScene', this);
    }

    update(){
        
    }
}
