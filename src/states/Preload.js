export default class Preload {

    constructor() {
        this.asset = null;
        this.ready = false;
    }

    preload() {
        this.load.image('loading_bg', 'assets/images/loading_bg.jpg');
    }

    create() {

        //background for game
        this.add.sprite(0, 0, "loading_bg");

        this.asset = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);

        //do all your loading here
        //this.load.image('player', 'assets/images/player.png'); //width and height of sprite
        this.load.image('enemy', 'assets/images/enemy.png');
        this.load.image('explosion', 'assets/images/explosion.png');

        this.load.spritesheet('player', 'assets/images/gunbot.png', 214, 269); //width and height of sprite
        this.load.image('hexagon', 'assets/images/hexagon_particle.png');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('enemyBullet', 'assets/images/enemyBullet.png');
        this.load.image('bg', 'assets/images/bg.jpg');

        this.load.image('health_bar', 'assets/images/health_bar.png');
        this.load.image('health_holder', 'assets/images/health_holder.png');
        this.load.image('circle', 'assets/images/circle.png');
		
		//Load codes for powerups
		this.load.image('health_1', 'assets/images/health_1.png');
		this.load.image('health_2', 'assets/images/health_2.png');
		this.load.image('health_3', 'assets/images/health_3.png');
		
		this.load.image('speed_1', 'assets/images/speed_1.png');
		this.load.image('speed_2', 'assets/images/speed_2.png');
		this.load.image('speed_3', 'assets/images/speed_3.png');
		
		this.load.image('bullets_1', 'assets/images/bullets_1.png');
		this.load.image('bullets_2', 'assets/images/bullets_2.png');
		this.load.image('bullets_3', 'assets/images/bullets_3.png');

        //staaaart load
        this.load.start();
    }

    update() {

        if (this.ready) {
            this.game.state.start('startScreen');
        }

    }

    onLoadComplete() {
        this.ready = true;
    }

}