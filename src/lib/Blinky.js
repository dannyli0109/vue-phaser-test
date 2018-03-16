/* eslint-disable no-unused-vars */
import 'pixi'
import 'p2'
import Phaser from 'phaser'
import { addAnimation, sign } from './util.js'
/* eslint-enable no-unused-vars */

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)
        this.anchor.setTo(0.5)

        this.scale.setTo(16 / 24, 16 / 24)
        addAnimation(this, 'right', [[6, 0, 16], [6, 1, 16]], 20)
        addAnimation(this, 'left', [[6, 4, 16], [6, 5, 16]], 20)
        addAnimation(this, 'up', [[6, 6, 16], [6, 7, 16]], 20)
        addAnimation(this, 'down', [[6, 2, 16], [6, 3, 16]], 20)
        // addAnimation(this, 'stop', [[7, 0, 16]], 20)
        this.game.physics.arcade.enable(this)

        this.cursors = this.game.input.keyboard.createCursorKeys()
        this.body.velocity.x = 90 * sign(Math.random())
        this.body.velocity.y = 90 * sign(Math.random())
        this.body.bounce.set(1)
        // this.body.velocity.x = 90
        // this.body.velocity.y = -90
        this.count = 0
        console.log(this.body.velocity.x, this.body.velocity.y)
        this.animations.play('right')
    }

    update () {
        // if (this.body.blocked.down || this.body.blocked.up || this.body.blocked.left || this.body.blocked.right) {
        //     this.body.velocity.x = 90 * sign(Math.random())
        //     this.body.velocity.y = 90 * sign(Math.random())
        // }
        if (this.count >= 100) {
            this.body.velocity.x = 90 * sign(Math.random())
            this.body.velocity.y = 90 * sign(Math.random())
            this.count = 0
        }
        // this.game.physics.arcade.collide(this.pacman, this.layer)
        // this.game.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this)
        if (this.body.position.x > this.body.prev.x) {
            this.animations.play('right')
        } else if (this.body.position.x < this.body.prev.x) {
            this.animations.play('left')
        } else if (this.body.position.y > this.body.prev.y) {
            this.animations.play('down')
        } else if (this.body.position.y < this.body.prev.y) {
            this.animations.play('up')
        } else {
            this.animations.stop()
        }

        if (this.body.position.x < 0) {
            this.body.position.x = 432
        } else if (this.body.position.x > 432) {
            this.body.position.x = 0
        }

        this.count += 1
    }
}
