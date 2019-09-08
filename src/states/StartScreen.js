export default class StartScreen {


    create() {
        console.log("Create?");
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.game.state.start('game');
        }
    }

}