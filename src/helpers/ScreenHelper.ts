import { Scene } from "phaser";

type ScreenDimensions = {width:number, height: number};

export default class ScreenHelper{

    static getScreenDimensions(scene:Scene):ScreenDimensions{
    
        let screenWidth:number = 0;
        let screenHeight:number = 0;
        
        if(typeof scene.sys.game.config.width == 'string') 
            screenWidth = parseInt(scene.sys.game.config.width);
        else
            screenWidth = scene.sys.game.config.width;
        
        if(typeof scene.sys.game.config.height == 'string')
            screenHeight = parseInt(scene.sys.game.config.height);
        else
            screenHeight = scene.sys.game.config.height;

        return {width: screenWidth, height: screenHeight};
    }
}