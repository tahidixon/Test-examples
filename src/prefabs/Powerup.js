import PlayerModel from "../models/PlayerModel.js";
import PowerupModel from "../models/PowerupModel.js";

export default class Powerup extends Phaser.Sprite {
	constructor(game, x, y, frame){
		//init type of powerup and level grade. Hopefully will clear up some issues keeping these vars in game.js
		
		super(game, x, y, 'temp', frame);
		
		this.powerupModel = new PowerupModel(this.game.PlayerModel, undefined, undefined);
		this.loadTexture(this.powerupModel.type);
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.powerupModel.PlayerModel = this.game.PlayerModel;
		this.body.velocity.x = -50;
		this.body.collideWorldBounds = false;
		this.outOfBoundsKill = true;
		
		this.PlayerModel = this.game.PlayerModel;
		
	}
	update() {
		this.x -= 4;
	}
	powerUp(player){
		this.powerupModel.powerUp(player);
	}
	
}