import PowerupModel from '../src/models/PowerupModel.js';
import PlayerModel from '../src/models/PlayerModel.js';

describe("Powerup model", function() {
	let assert = chai.assert;
	let expect = chai.expect;
	
	it("Can be created", function() {
		let powerup = new PowerupModel();
		assert.isOk(true);
	});
	
	it("Can be created using specific parameters", function() {
		let powerup = new PowerupModel('bullets', 3);
		let powerup1 = new PowerupModel(2, 1);
		assert.isOk(true);
	});
	it("Can be created using different types of parameters", function() {
		let powerup = new PowerupModel('bullets', 1);
		let powerup1 = new PowerupModel(0, 1);
		assert.isOk(true);
	});
	
	//it("Can be safe from invalid inputs", function() {
	//	assert.throws(let powerup = new PowerupModel('bulletz', 3);
	//	assert.throws(let powerup1 = new PowerupModel('bullets', 0);
	//	assert.throws(let powerup2 = new PowerupModel(3, 3);
	//});
	
	it("Can heal you!", function() {
		let player = new PlayerModel()
		let powerup = new PowerupModel(player, 1, 1);
		powerup.powerUp(player, powerup);
		assert.isOk(true);
	});
	it("Can give you bullets!", function() {
		let player = new PlayerModel();
		let powerup = new PowerupModel(player, 0, 1);
		powerup.powerUp(player, powerup);
		assert.isOk(true);
	});
	it("Can speed you up!", function() {
		let player = new PlayerModel();
		let powerup = new PowerupModel(player, 'speed', 3);
		powerup.powerUp(player, powerup);
		assert.isOk(true);
	});
	it("Can't give you more bullets than your maximum.", function() {
		let player = new PlayerModel();
		let powerup = new PowerupModel(player, 0, 3);
		//player.gun.fire();
		powerup.powerUp(player, powerup);
		assert.isOk(player.gun.bullets == player.gun.max_bullets);
	});
	it("Can't give you more health than your maximum.", function() {
		let player = new PlayerModel();
		let powerup = new PowerupModel(player, 1, 3);
		player.damage(10);
		powerup.powerUp(player, powerup);
		assert.isOk(player.health == player.max_health);
	});
	it("Can't speed you up any faster than a ratio of 150.", function() {
		let player = new PlayerModel();
		let newpowerup = new PowerupModel(player, 'speed', 3);
		player.change_max_speed(149.5);
		newpowerup.powerUp(player, newpowerup);
		assert.isOk(player.max_speed == 150);
	});
});