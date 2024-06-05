import { Scene } from 'phaser';
import ScreenHelper from '../helpers/ScreenHelper';
import ControlsHelper from '../helpers/ControlsHelper';
import SmallVehicle from '../classes/SmallVehicle';
import MediumVehicle from '../classes/MediumVehicle';
import LargeVehicle from '../classes/LargeVehicle';

export default class MainScene extends Scene{

    private backgroundIdx1:Phaser.GameObjects.TileSprite;
    private backgroundIdx2:Phaser.GameObjects.TileSprite;
    private backgroundIdx3:Phaser.GameObjects.TileSprite;

    private cars:Phaser.Physics.Arcade.Group;
    private splash:Phaser.GameObjects.Sprite;
    private runner:Phaser.Physics.Arcade.Sprite;
    private isJumping:boolean;

    private progressCurrentLevel:number;
    private progressRequiredForNextLevel:number;

    constructor(){

        super('MainScene');

        this.progressCurrentLevel = 0;
        this.progressRequiredForNextLevel = 1;
    }

    preload(){

        this.load.audio('sfxCrash', 'assets/snd/crash.mp3');
        this.load.image('backgroundIdx1', 'assets/img/backgroundIdx1.png');
        this.load.image('backgroundIdx2', 'assets/img/backgroundIdx2.png');
        this.load.image('backgroundIdx3', 'assets/img/backgroundIdx3.png');
        this.load.image('car11', 'assets/img/car11.png');
        this.load.image('car12', 'assets/img/car12.png');
        this.load.image('car21', 'assets/img/car21.png');
        this.load.image('car22', 'assets/img/car22.png');
        this.load.image('car3', 'assets/img/car3.png');

        this.load.spritesheet('runner', 'assets/img/run.png', { frameWidth: 512, frameHeight: 512 });
        this.load.spritesheet('splash', 'assets/img/splash.png', { frameWidth: 512, frameHeight: 512 });
    }

    create(){

        const screen = ScreenHelper.getScreenDimensions(this);

        this.sound.add('sfxCrash');
        this.sound.removeByKey('backgroundMusic');

        const bgSound = this.sound.add('backgroundMusic');
        bgSound.setLoop(true);
        bgSound.play();

        this.backgroundIdx3 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx3').setDisplaySize(screen.width, screen.height);
        this.backgroundIdx2 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx2').setDisplaySize(screen.width, screen.height);
        this.backgroundIdx1 = this.add.tileSprite(960, 540, 1920, 1080, 'backgroundIdx1').setDisplaySize(screen.width, screen.height);

        this.runner = this.physics.add.sprite(100, screen.height/1.33, 'runner').setScale(0.2);
        this.splash = this.add.sprite(this.runner.x, 0, 'splash').setScale(0.2);
        this.splash.visible = false;
        this.splash.on('animationcomplete', (animation:any, frame:any) => {
            if(animation.key == 'splash')
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

        ControlsHelper.callbackOnPointerDownOrSpace(this.makeRunnerJump, this);

        this.runner.anims.play('run', true);
        this.cars = this.physics.add.group();

        this.incomingTraffic();

        this.physics.add.collider(this.runner, this.cars, (one, rest) => { 
            //console.log(one, rest) 
        });

        //this.physics.add.overlap(this.layer, enemy, () => {
        //});
    }

    makeRunnerJump(){

        if(!this.isJumping){

            this.splash.visible = true;
            this.splash.anims.play('splash', true);

            this.isJumping = true;
            this.runner.setVelocityY(-320);

            if(this.runner.anims.currentAnim){
                this.runner.anims.currentAnim.pause();
                this.runner.anims.setCurrentFrame(this.runner.anims.currentAnim.frames[3])
            }
        }
    }

    incomingTraffic(){

        const screen = ScreenHelper.getScreenDimensions(this);

        if(this.cars.children.entries.length < 3){

            const car = new SmallVehicle(this, screen.width, screen.height, [this.cars]);
        }
        else{

            const random = Phaser.Math.Between(1,3);

            if(1 == random){
                const car = new SmallVehicle(this, screen.width, screen.height, [this.cars]);
            }else if(2 == random){
                const truck = new MediumVehicle(this, screen.width, screen.height, [this.cars]);
            } else if(3 == random){
                const bus = new LargeVehicle(this, screen.width, screen.height, [this.cars]);
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

        const screen = ScreenHelper.getScreenDimensions(this);

        this.cars.children.iterate((car:Phaser.GameObjects.GameObject):boolean | null => {

            const ptr = (car as unknown as Phaser.Physics.Arcade.Sprite);
            if(ptr.x < -ptr.displayWidth){
                ptr.x = screen.width;
                this.progressCurrentLevel++;
            }

            return null;
        });

        if(this.progressCurrentLevel == this.progressRequiredForNextLevel){
  
            this.incomingTraffic();
            this.progressRequiredForNextLevel += this.progressRequiredForNextLevel;
        }

        if(this.runner.x != 100){

            this.progressCurrentLevel = 0;
            this.progressRequiredForNextLevel = 1;

            this.sound.stopAll();
            this.sound.play('sfxCrash');
            this.scene.start('GameOverScene');
        }
    }
}
