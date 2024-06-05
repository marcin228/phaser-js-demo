import Vehicle from "./Vehicle";

export default class SmallVehicle extends Vehicle{

    constructor(scene:Phaser.Scene, x:number, y:number, groups:Array<Phaser.Physics.Arcade.Group>){

        const variant = Phaser.Math.Between(1,2);

        super(scene, x, y, 'car1'+variant);
        this.vehicleType = 'small';
        this.y -= this.displayHeight / 2;

        for(let key in groups)
            groups[key].add(this, true);
        
        (this.body as Phaser.Physics.Arcade.Body).setVelocityX(Phaser.Math.Between(-200,-600));
        (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    }
}