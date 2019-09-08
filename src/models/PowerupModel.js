import PlayerModel from '../models/PlayerModel.js';

export default class PowerupModel {
	
	constructor(PlayerModel = null, type = Math.floor(Math.random() * 2), level = Math.floor((Math.random() * 3) + 1)){
		//Catches invalid powerups created 
		//if(this.type != 'bullets' && this.type != 'health' && this.type != 'speed') throw "Invalid powerup type.";
		//if(level < 1 || level > 3) throw "Invalid powerup level. Range is between 1-3.";
		
		//Places type index on string parameters passed. This way I don't have to keep recreating this if/then/elsewhere
		this.type = type;
		this.level = level;
		if(this.isValid(type, level)){
			console.log("isValid");
			if(this.type == 'bullets'){
				this.typeIndex = 0;
				this.type = this.type + "_" + this.level;
			}
			else if(this.type == 'health'){
				this.typeIndex = 1;
				this.type = this.type + "_" + this.level;
			}
			else if(this.type == 'speed'){
				this.typeIndex = 2;
				this.type = this.type + "_" + this.level;
			}
			else if(this.type == 0){
				this.type = 'bullets_' + this.level;
				this.typeIndex = 0;
			}else if(this.type == 1){
				this.type = 'health_' + this.level;
				this.typeIndex = 1;
			}else if(this.type == 2){
				this.type = 'speed_' + this.level;
				this.typeIndex = 2;
			}
			console.log("isValid end of type type: " + this.type);
		}
		//If values fail to generate from empty constructor call, regenerate values.
		else if(!this.isValid(type, level)){
			console.log("isNotValid");
			this.typeIndex = Math.floor(Math.random() * 2);
			this.level = Math.floor((Math.random() * 2) + 1);
			if(this.typeIndex == 0) this.type = 'bullets_' + this.level;
			if(this.typeIndex == 1) this.type = 'health_' + this.level;
			if(this.typeIndex == 2) this.type = 'speed_' + this.level;
			else this.type = 'health_' + this.level;
			console.log("End of not valid type build: " + this.type);
		}else throw "Failed to create powerup";
		
		this.PlayerModel = PlayerModel;
	}
	
	powerUp(player)
	{
		if (this.typeIndex == 0 && player.gun.max_bullets > player.gun.bullets + (this.level * 3)) player.gun.add_bullets(this.level * 3);
		else if(this.typeIndex == 0 && player.gun.max_bullets < player.gun.bullets + (this.level * 3)) player.gun.add_bullets(player.gun.max_bullets - player.gun.bullets);
		else if(this.typeIndex == 1 && player.max_health > (this.level * 30)) player.heal(this.level * 30);
		else if(this.typeIndex == 1 && player.max_health < (this.level * 30)) player.heal(player.max_health - player.health);
		else if(this.typeIndex == 2 && (player.max_speed * ((this.level * 0.2) + 1) < 150)){
			player.change_max_speed((this.level * 0.2) + 1);
		}
		else if(this.typeIndex == 2 && (player.max_speed * ((this.level * 0.2) + 1) >= 150)){
			player.change_max_speed(150);
		}
	}
	
	get_type() {
		return this.type;
	}
	get_level() {
		return this.level;
	}
	
	isValid(type, level){
		if(this.type == 'bullets' || this.type == 'health' || this.type == 'speed') return true;
		else if(this.type == 0 || this.type == 1 || this.type == 2) return true;
		else if(this.type == "bullets_1" || this.type == "bullets_2" || this.type == "bullets_3") return true;
		else if(type == "health_1" || type == "health_2" || type == "health_3") return true;
		else if(type == "speed_1" || type == "speed_2" || type == "speed_3") return true;
		else return false;
	}
}