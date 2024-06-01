import { Scene } from 'phaser';

export default class MainScene extends Scene
{
    constructor (){

        super('MainScene');
    }

    preload(){

    }

    create(){

        this.sound.stopByKey('backgroundMusic');
    }

    update(){
        
    }
}
