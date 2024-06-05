import { Scene } from 'phaser';
import ScreenHelper from '../helpers/ScreenHelper';

export default class GameOverScene extends Scene{

    private endScreen:Phaser.GameObjects.Image;

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

        const gameOver = this.add.image(screen.width / 2, 0, 'gameOver').setOrigin(0.5, 0);
        this.tweens.add({
            
            targets: gameOver,
            scale: 1.05,
            ease: 'Power1',
            duration: 200,
            repeat: -1,
            yoyo:true,
            onStart: () => {},
            onComplete: () => {}
        })

        this.input.on('pointerdown', () => this.scene.start('MenuScene'));
        const spaceBar = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if(spaceBar)
            spaceBar.on('down', () => { this.scene.start('MenuScene') }, this);
    }

    update(){
        
    }
}
