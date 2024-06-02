import { Scene } from 'phaser';

export default class MainScene extends Scene
{

    private backgroundIdx1:Phaser.GameObjects.TileSprite;
    private backgroundIdx2:Phaser.GameObjects.TileSprite;
    private backgroundIdx3:Phaser.GameObjects.TileSprite;

    constructor (){

        super('MainScene');
    }

    preload(){

        this.load.image('backgroundIdx1', 'assets/img/backgroundIdx1.png');
        this.load.image('backgroundIdx2', 'assets/img/backgroundIdx2.png');
        this.load.image('backgroundIdx3', 'assets/img/backgroundIdx3.png');
    }

    create(){

        this.sound.stopByKey('backgroundMusic');

        this.backgroundIdx3 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx3');
        this.backgroundIdx2 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx2');
        this.backgroundIdx1 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx1');
    }

    update(){

        this.backgroundIdx1.tilePositionX -= 0.2;
        this.backgroundIdx2.tilePositionX -= 0.5;
        this.backgroundIdx3.tilePositionX -= 0.8;
    }
}
