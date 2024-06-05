export default class ControlsHelper{

    static gotoSceneOnPointerDownOrSpace(scene:string, context:any):void{

        context.input.on('pointerdown', () => context.scene.start(scene));
        const spaceBar = context.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if(spaceBar)
            spaceBar.on('down', () => { context.scene.start(scene) }, context);
    }

    static callbackOnPointerDownOrSpace(callback:Function, context:any):void{

        context.input.on('pointerdown', callback, context);
        const spaceBar = context.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if(spaceBar)
            spaceBar.on('down', callback, context);
    }
}