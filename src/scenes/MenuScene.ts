import { Scene } from 'phaser';

export default class MenuScene extends Scene
{
    constructor (){
    
        super('MenuScene');
    }

    preload(){

        this.load.audio('backgroundMusic', 'assets/snd/2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3');
        this.load.image('background01', 'assets/img/background01.png');
        this.load.image('title01', 'assets/img/TOKYO-RUN-1-06-2024.png');
    }

    create(){

        let screenWidth:number = 0;
        let screenHeight:number = 0;
        
        if(typeof this.sys.game.config.width == 'string') 
            screenWidth = parseInt(this.sys.game.config.width);
        else
            screenWidth = this.sys.game.config.width;
        
        if(typeof this.sys.game.config.height == 'string')
            screenHeight = parseInt(this.sys.game.config.height);
        else
            screenHeight = this.sys.game.config.height;

        this.sound.add('backgroundMusic');
        this.sound.play('backgroundMusic');

        let background01 = this.add.image(0, 0, 'background01').setOrigin(0,0);
        background01.displayHeight = screenHeight;
        background01.displayWidth = screenWidth;
        background01.setInteractive().on('pointerdown', () => this.scene.start('MainScene'));

        let title01 = this.add.image(screenWidth / 2, 0, 'title01').setOrigin(0.5, 0);
        this.tweens.add({
            
            targets: title01,
            scale: 1.05,
            ease: 'Power1',
            duration: 200,
            repeat: -1,
            yoyo:true,
            onStart: () => {},
            onComplete: () => {}
        })
    }

    update(){
        
    }
}
