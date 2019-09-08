import Player from "../src/prefabs/Player.js";

describe("Player", function() {
    let assert = chai.assert;
    let player;

    //Test fixture, create the same kind of player before each test
    beforeEach(function() {
        // Stubbing out the features not used in constructor
        let game = sinon.stub();
        game.physics = sinon.stub();
        game.physics.enable = sinon.stub();
        let bullets = sinon.stub();

        player = new Player(game, 0, 0, bullets);
    });

    it("Can be created", function() {
        //We now build the player before each test case
        assert.isOk(true);
    });

    it("Plays an animation after being created", function() {
        //We now build the player before each test case
        assert.isOk(player.animations.play.called);
    });

    it("can be updated without any keys being pressed", function() {
        player.update();
        assert.isOk(true);
    });

    it("changes velocity when the left button is pressed", function() {
        player.cursors.left.isDown = true;
        player.update();

        //Not testing the model, so we can use the max_speed
        assert.equal(player.body.velocity.x, -player.playerModel.max_speed);

        //Reverting button push
        player.cursors.left.isDown = false;
    });

    //Tests you could add..
    // 1) What happens when you press the other keys?
    // 2) What happens when combinations of two, three, or four arrow keys are pressed simultaneously?
    //     - Note: Each combo wouldn't count individually in your assignment

    // More difficult because there are some missing stubs in the mock object
    // 1) What happens when the fire button is pressed?

    // 1
    it("Changes velocity when the up button is pressed", function() {
        player.cursors.up.isDown = true;
        player.update();

        assert.equal(player.body.velocity.y, -player.playerModel.max_speed);

        player.cursors.up.isDown = false;

    });
    // 2 
    it("Changes velocity when the down button is pressed", function() {
        player.cursors.down.isDown = true;
        player.update();

        assert.equal(player.body.velocity.y, player.playerModel.max_speed);

        player.cursors.down.isDown = false;
    });
    // 3
    it("Changes velocity when the right button is pressed", function() {
        player.cursors.right.isDown = true;

        player.update();


        assert.equal(player.body.velocity.x, player.playerModel.max_speed);

        player.cursors.right.isDown = false;
    });
    // 4
    it("Changes velocity when both right and left button is down", function() {
        player.cursors.right.isDown = true;
        player.cursors.left.isDown = true;

        player.update();

        assert.equal(player.body.velocity.x, player.playerModel.max_speed);

        player.cursors.right.isDown = false;
        player.cursors.left.isDown = false;




    });

});