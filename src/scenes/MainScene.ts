import { Scene } from 'phaser';
import ScreenHelper from '../helpers/ScreenHelper';

export default class MainScene extends Scene{

    private backgroundIdx1:Phaser.GameObjects.TileSprite;
    private backgroundIdx2:Phaser.GameObjects.TileSprite;
    private backgroundIdx3:Phaser.GameObjects.TileSprite;

    private splash:Phaser.GameObjects.Sprite;
    private runner:Phaser.Physics.Arcade.Sprite;
    private isJumping:boolean;

    constructor (){

        super('MainScene');
    }

    preload(){

        this.load.image('backgroundIdx1', 'assets/img/backgroundIdx1.png');
        this.load.image('backgroundIdx2', 'assets/img/backgroundIdx2.png');
        this.load.image('backgroundIdx3', 'assets/img/backgroundIdx3.png');

        this.load.spritesheet('runner', 'assets/img/run.png', { frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('splash', 'assets/img/splash.png', { frameWidth: 512, frameHeight: 512 });
    }

    create(){

        const screen = ScreenHelper.getScreenDimensions(this);

        this.sound.stopByKey('backgroundMusic');
        this.sound.play('backgroundMusic');

        this.backgroundIdx3 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx3').setDisplaySize(screen.width, screen.height);
        this.backgroundIdx2 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx2').setDisplaySize(screen.width, screen.height);
        this.backgroundIdx1 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx1').setDisplaySize(screen.width, screen.height);

        this.runner = this.physics.add.sprite(100, 100, 'runner').setScale(0.2);
        this.splash = this.add.sprite(this.runner.x, 0, 'splash').setScale(0.2);
        this.splash.visible = false;
        this.splash.on('animationcomplete', (animation:any, frame:any) => {
            if(animation.key === 'splash')
                this.splash.visible = false;
        }, this);

        this.isJumping = false;
        this.runner.setCollideWorldBounds(true);

        this.anims.create({
            key:'run',
            frames: this.anims.generateFrameNumbers('runner', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'splash',
            frames: this.anims.generateFrameNumbers('splash', {start:0, end: 3}),
            frameRate: 10,
            repeat: 0
        });

        this.input.keyboard?.on('keydown-SPACE', this.makeRunnerJump, this);

        this.runner.anims.play('run', true);
    }

    makeRunnerJump(){

        if(!this.isJumping){

            this.splash.visible = true;
            this.splash.anims.play('splash', true);

            this.isJumping = true;
            this.runner.setVelocityY(-300);

            if(this.runner.anims.currentAnim){
                this.runner.anims.currentAnim.pause();
                this.runner.anims.setCurrentFrame(this.runner.anims.currentAnim.frames[3])
            }
        }
    }

    update(){

        this.backgroundIdx1.tilePositionX += 8;
        this.backgroundIdx2.tilePositionX += 4;
        this.backgroundIdx3.tilePositionX += 1;

        if(this.runner?.body?.blocked.down){
            this.isJumping = false;
            this.splash.x = this.runner.x;
            this.splash.y = this.runner.y;
        }
        
        if(!this.isJumping)
            this.runner.anims.currentAnim?.resume();
    }
}
