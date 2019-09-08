import Enemy from "../src/prefabs/Enemy.js";
import EnemyHorizontal from "../src/prefabs/EnemyHorizontal.js";
import EnemyCos from "../src/prefabs/EnemyCos.js";

describe("Enemy", function() {
            let assert = chai.assert;
            let expect = chai.expect;
            var enemy1;
            let enemy2;
            let enemy3;

            beforeEach(function() {
                // Stubbing out the features not used in constructor
                let game = sinon.stub();
                game.physics = sinon.stub();
                game.physics.enable = sinon.stub();
                let bulletLayer = sinon.stub();
                let frame = sinon.stub();


                enemy1 = new Enemy(game, 0, 0, bulletLayer, frame);

            });


            it("Enemy 1 can be created", function() {
                assert.isOk(true);

            });
            it("Enemy 1 speed is 100", function() {
            
            assert.equal(enemy1.body.velocity.x,-100);


            });


            beforeEach(function() {
                // Stubbing out the features not used in constructor
                let game = sinon.stub();
                game.physics = sinon.stub();
                game.physics.enable = sinon.stub();
                let bulletLayer = sinon.stub();
                let frame = sinon.stub();


                enemy2 = new EnemyHorizontal(game, 0, 0, bulletLayer, frame);
            });

            it("Enemy 2 can be created", function() {
                assert.isOk(true);
            });
           
            it("Enemy 2 speed is 100", function() {
            
            assert.equal(enemy2.body.velocity.x,-100);


            });
            beforeEach(function() {
                // Stubbing out the features not used in constructor
                let game = sinon.stub();
                game.physics = sinon.stub();
                game.physics.enable = sinon.stub();
                let bulletLayer = sinon.stub();
                let frame = sinon.stub();


                enemy3 = new EnemyCos(game, 0, 0, bulletLayer, frame);
            });

            it("Enemy 3 can be created", function() {
                assert.isOk(true);
            });
            it("Enemy 3 speed is 100", function() {
            
            assert.equal(enemy3.body.velocity.x,-100);


            });

});