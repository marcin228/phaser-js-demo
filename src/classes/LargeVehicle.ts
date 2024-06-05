import Vehicle from "./Vehicle";

export default class LargeVehicle extends Vehicle{

    constructor(scene:Phaser.Scene, x:number, y:number, groups:Array<Phaser.Physics.Arcade.Group>){

        super(scene, x, y, 'car3');
        this.vehicleType = 'large';
        this.y -= this.displayHeight / 2;

        for(let key in groups)
            groups[key].add(this, true);
        
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(Phaser.Math.Between(-150,-200));
        (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    }
}