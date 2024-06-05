export type VehicleType = 'small' | 'medium' | 'large';

export default class Vehicle extends Phaser.Physics.Arcade.Sprite{

    protected vehicleType:VehicleType;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string){

        super(scene, x, y, texture);
    }
}