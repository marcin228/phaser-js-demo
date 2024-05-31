import { Scene } from 'phaser';

export default class MainScene extends Scene
{
    constructor ()
    {
        super('MainScene');
    }

    preload(){

        this.load.image('background01', 'assets/background01.png');
    }

    create(){

        this.add.image(0,0,'background01').setOrigin(100,100);
    }

    update(){
        
        // test
    }
}
