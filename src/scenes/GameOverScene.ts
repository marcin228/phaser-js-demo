import { Scene } from 'phaser';
import ScreenHelper from '../helpers/ScreenHelper';

export default class GameOverScene extends Scene{

    private endScreen:Phaser.GameObjects.Image;

    constructor (){
    
        super('GameOverScene');
    }

    preload(){

        this.load.image('endScreen', 'assets/img/background02.png');
    }

    create(){

        const screen = ScreenHelper.getScreenDimensions(this);
        this.endScreen = this.add.image(0, 0, 'endScreen').setOrigin(0, 0).setDisplaySize(screen.width, screen.height);
    }

    update(){
        
    }
}
