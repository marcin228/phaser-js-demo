type ScreenDimensions = {width:number, height: number};

export default class GameConfigHelper{

    private screenWidth:number;
    private screenHeight:number;

    constructor(screenWidth?:number, screenHeight?:number){
    
        this.screenWidth = screenWidth ?? 1920;
        this.screenHeight = screenHeight ?? 1080;
    }

    getScreenSize():ScreenDimensions{

        return { width: this.screenWidth, height: this.screenHeight};
    }
}