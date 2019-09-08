import PlayerModel from "../models/PlayerModel.js";

export default class Player extends Phaser.Sprite {

    constructor(game, x, y, bullets) {
        super(game, x, y, 'player', 0);

        this.playerModel = new PlayerModel(10, 10);

        //This code is specifically related to how the player model is "viewed"
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.drag.x = 40; // Might want to put these variables into the PlayerModel
        this.body.drag.y = 40;
        this.body.collideWorldBounds = true;

        this.bulletSpites = bullets;
        this.fireposition = {x: 160, y: 100};

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.cycleButton = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);

        this.animations.add("fly", [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
        this.fireAnimation = this.animations.add("fire", [11, 12, 13]);
        this.fireAnimation.onComplete.add(this.playFly, this);
        this.animations.play("fly", 14, true);
	this.lastSwap = Date.now();

    }

    update() {
        // write your prefab's specific update code here
        if (this.cursors.left.isDown) {
            this.body.velocity.x = -this.playerModel.max_speed;
        }

        if (this.cursors.right.isDown) {
            this.body.velocity.x = this.playerModel.max_speed;
        }

        if (this.cursors.left.isUp && this.cursors.right.isUp) {
            this.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown) {
            this.body.velocity.y = -this.playerModel.max_speed;
        }

        if (this.cursors.down.isDown) {
            this.body.velocity.y = this.playerModel.max_speed;
        }

        if (this.cursors.up.isUp && this.cursors.down.isUp) {
            this.body.velocity.y = 0;
        }

        if (this.fireButton.isDown) {
            this.fire();
        }
	if (this.cycleButton.isDown) {
	    if(Date.now() - this.lastSwap >= 150) {
	    this.playerModel.gun.enableMachinegun(); //These two lines are only for testing purposes
	    this.playerModel.gun.enableSniper(); //testing
	    this.playerModel.gun.cycleWeapons();
	    this.lastSwap = Date.now(); }
	}
    }

    fire() {
      if(this.playerModel.gun.getShotType() == "default") {
        if (this.playerModel.gun.canBeFired()) {
            this.playerModel.gun.fire();

            //This is all related to the view of the bullet, not the model (except the hardcoded velocity below)
            let bullet = this.bulletSpites.getFirstDead();
            if (bullet) {
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 200;
            }

            this.animations.play("fire");

        }
      }
     else if (this.playerModel.gun.getShotType() == "sniper") {
              if (this.playerModel.gun.canBeFired()) {
            this.playerModel.gun.fire();

            //This is all related to the view of the bullet, not the model (except the hardcoded velocity below)
            let bullet = this.bulletSpites.getFirstDead();
            if (bullet) {
		bullet.body.velocity.x = 2000;
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 2000;
            }

            this.animations.play("fire");

        }
     }
     else if (this.playerModel.gun.getShotType() == "machinegun") {
              if (this.playerModel.gun.canBeFired()){
            	this.playerModel.gun.fire();

            //This is all related to the view of the bullet, not the model (except the hardcoded velocity below)
 	    let bullet = this.bulletSpites.getFirstDead();
            if (bullet) {
	 	bullet.body.velocity.x = 400;
                bullet.x = this.x + this.fireposition.x;
                bullet.y = this.y + this.fireposition.y;
                bullet.revive();
            } else {
                bullet = this.bulletSpites.create(this.x + this.fireposition.x, this.y + this.fireposition.y, "bullet");
                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                bullet.outOfBoundsKill = true;
                bullet.checkWorldBounds = true;
                bullet.body.velocity.x = 400;
            }

            this.animations.play("fire");
	    }
	}

    }
     


    damage(amt) {
        this.playerModel.damage(amt);
    }

    playFly() {
        this.animations.play("fly", 14, true);
    }
	
	
}