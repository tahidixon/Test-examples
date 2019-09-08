//require our other components
import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";
import EnemyHorizontal from "../prefabs/EnemyHorizontal.js";
import EnemyCos from "../prefabs/EnemyCos.js";
import NumberBox from "../prefabs/NumberBox.js";
import HealthBar from "../prefabs/HealthBar.js";
import Powerup from "../prefabs/Powerup.js";
import PlayerModel from "../models/PlayerModel.js";

export default class Game extends Phaser.State {

    constructor() {
        //object level properties
        super();

    }

    create() {
        this.spawnChance = .04;
        this.spawnChanceEnemy = .02;
		this.spawnChancePowerup = .0025;
        this.score = 0;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bg = this.add.tileSprite(0, 0, 1024, 768, 'bg');

        this.bullets = this.add.group();
        this.enemyBullets = this.add.group();

        //add player
        this.player = new Player(this.game, 0, 0, this.bullets);
        this.game.add.existing(this.player);

        //add a few enemeis..
        this.enemies = this.add.group();
        for (let i = 0; i < 5; i++) {
            let enemy1 = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy1);
            
            let enemy2 = new EnemyHorizontal(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy2);
           
            let enemy3 = new EnemyCos(this.game, this.game.width + 200 + (Math.random() * 200), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy3);
        }
        
		//Add powerups
		this.powerups = this.add.group();

        //add the explosions
        this.explosions = this.game.add.emitter(0, 0, 200);
        this.explosions.makeParticles("hexagon");
        this.explosions.setAlpha(1, .2, 2000);
	
	//Extra display text
	this.text = "";
	this.bulletsDisplay = "";

        //add UI
        this.setupUI();

        //wave timer
        this.waveTimer = this.game.time.create(false);
        this.waveTimer.loop(20000, this.incrementWave, this);
        this.waveTimer.start();
    }

    setupUI() {
        this.UILayer = this.add.group();

        this.scoreField = new NumberBox(this.game, "circle", 0);
        this.UILayer.add(this.scoreField);

        this.healthBar = new HealthBar(this.game, 120, 40, "health_bar", "health_holder");
        this.UILayer.add(this.healthBar);

	this.text = this.game.add.text(100, 100, this.player.playerModel.gun.getShotType(), "");
	this.text.addColor('#62f442', 0);
	this.UILayer.add(this.text);

	this.bulletsDisplay = this.game.add.text(275, 100, "Bullets " + this.player.playerModel.gun.bullets, "");
	this.bulletsDisplay.addColor('#62f422', 0);
	this.UILayer.add(this.bulletsDisplay);
	
    }

    update() {
        this.bg.tilePosition.x -= .5;

        if (Math.random() < this.spawnChance) {
            let enemy1 = new Enemy(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy1);
              
            let enemy2 = new EnemyHorizontal(this.game, this.game.width + 150 + (Math.random() * 300), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy2);
           
            let enemy3 = new EnemyCos(this.game, this.game.width + 200 + (Math.random() * 200), Math.random() * this.game.height, this.enemyBullets);
            this.enemies.add(enemy3);
        }
		if (Math.random() < this.spawnChancePowerup) {
			let powerup = new Powerup(this.game, this.game.width + 100 + (Math.random() * 400), Math.random() * this.game.height);
			this.powerups.add(powerup);
		}

        this.physics.arcade.overlap(this.enemies, this.bullets, this.damageEnemy, null, this);
        this.physics.arcade.overlap(this.player, this.enemies, this.damagePlayer, null, this);
        this.physics.arcade.overlap(this.player, this.enemyBullets, this.damagePlayer, null, this);
		this.physics.arcade.overlap(this.player, this.powerups, this.powerUp, null,this);
		this.text.setText(this.player.playerModel.gun.getShotType());
		this.bulletsDisplay.setText("Bullets " + this.player.playerModel.gun.bullets);
    }

    incrementWave() {
        this.spawnChance *= 1.4;
		this.spawnChancePowerup *= 1.00025;
    }

    damagePlayer(playerRef, enemyRef) {
        this.player.damage(1);
        this.healthBar.setValue(this.player.playerModel.health / this.player.playerModel.max_health);
        enemyRef.kill();

        if (this.player.playerModel.health <= 0) {
            this.game.state.start('gameOver');
        }
    }

    damageEnemy(enemy, bullet) {

        this.explosions.x = enemy.x;
        this.explosions.y = enemy.y;

        this.explosions.explode(2000, 4);

        enemy.kill();
        bullet.kill();

        this.score++;
        this.scoreField.setValue(this.score);
    }
	powerUp(playerRef, powerupRef){
		powerupRef.powerUp(this.player.playerModel);
		powerupRef.kill();
		
		
	}
	

}