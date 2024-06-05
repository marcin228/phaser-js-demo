import { Scene } from 'phaser';
import ScreenHelper from '../helpers/ScreenHelper';
import ControlsHelper from '../helpers/ControlsHelper';

export default class MenuScene extends Scene
{
    constructor (){
    
        super('MenuScene');
    }

    preload(){

        this.load.audio('backgroundMusic', 'assets/snd/2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3');
        this.load.image('background01', 'assets/img/background01.png');
        this.load.image('title01', 'assets/img/tokyorun.png');
    }

    create(){

        const screen = ScreenHelper.getScreenDimensions(this);

        this.sound.add('backgroundMusic');
        this.sound.play('backgroundMusic');

        let background01 = this.add.image(0, 0, 'background01').setOrigin(0,0);
        background01.setDisplaySize(screen.width, screen.height);

        ControlsHelper.gotoSceneOnPointerDownOrSpace('MainScene', this);

        let title01 = this.add.image(screen.width / 2, 0, 'title01').setOrigin(0.5, 0);
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
