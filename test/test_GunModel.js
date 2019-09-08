import GunModel from "../src/models/GunModel.js";

describe("Gun Model", function () {
    let assert = chai.assert;

    it("Can be created", function () {
        let model = new GunModel();
        assert.isOk(true);
    });

    it('initially has 10 bullets with maximum capacity of 100', function () {
        let model = new GunModel();
        assert.equal(model.bullets, 10);
        assert.equal(model.max_bullets, 100);
    });

    it('can be created with a specified number of bullets and maximum capacity', function () {
        let model = new GunModel(12, 25);
        assert.equal(model.bullets, 12);
        assert.equal(model.max_bullets, 25);
    });

    it('removes one bullet when fired', function () {
        let model = new GunModel();
        model.fire();
        assert.equal(model.bullets, 9);
    });

    it('has a method to check to see if it can be fired', function () {
        let model = new GunModel();
        assert.equal(model.canBeFired(), true);
    });

    it('can not be fired again if it has been fired immediately before', function () {
        let model = new GunModel();
        model.fire();
        assert.equal(model.canBeFired(), false);
    });

    it('can be fired 500 milliseconds after the last firing', function () {
        let clock = sinon.useFakeTimers();
        let model = new GunModel();
        model.fire();
        //Stub the clock ahead by 500 milliseconds
        clock.tick(500);

        assert.equal(model.canBeFired(), true);
        clock.restore()
    });

    it('can fire at 200 velocity', function () {
	let model = new GunModel();
	assert.equal(model.bullet_velocity, 200);
    });

//Start 8 tests for Assignment 7 here

    it('starts with machinegun and sniper shots disabled', function () {
	let model = new GunModel();
	assert.equal(model.machinegunEnabled, false);
	assert.equal(model.sniperEnabled, false);
    });

    it('machinegun can be enabled', function () {
	let model = new GunModel();
	model.enableMachinegun();
	assert.equal(model.machinegunEnabled, true);
    });

    it('sniper can be enabled', function () {
	let model = new GunModel();
	model.enableSniper();
	assert.equal(model.sniperEnabled, true);
    });

    it('can cycle to machinegun', function () {
	let model = new GunModel();
	model.enableMachinegun();
	assert.equal(model.shotType, "default");
	model.cycleWeapons();
	assert.equal(model.shotType, "machinegun");
    });

    it('can cycle to sniper', function () {
        let model = new GunModel();
	model.enableMachinegun();
	model.enableSniper();
	assert.equal(model.shotType, "default");
	model.cycleWeapons();
	model.cycleWeapons();
	assert.equal(model.shotType, "sniper");
    });

    it('can cycle to an enabled machinegun and fire to remove one bullet', function() {
	let model = new GunModel();
	model.enableMachinegun();
	assert.equal(model.canBeFired(), true);
	model.cycleWeapons();
	assert.equal(model.shotType, "machinegun");
	model.fire();
	assert.equal(model.bullets, 9);
    });

    it('can cycle to an enabled sniper and fire to remove one bullet', function() {
	let model = new GunModel();
	model.enableMachinegun();
	model.enableSniper();
	assert.equal(model.canBeFired(), true);
	model.useSniper();
	assert.equal(model.shotType, "sniper");
	model.fire();
	assert.equal(model.bullets, 8);
    });

    it('machinegun has a 100ms delay between bullet fires', function() {
	let clock = sinon.useFakeTimers();
        let model = new GunModel();
	model.enableMachinegun();
	model.useMachinegun();
	model.fire();
                clock.tick(500);

        assert.equal(model.canBeFired(), true);
        clock.restore()

    });

});