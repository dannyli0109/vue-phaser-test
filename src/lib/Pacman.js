/* eslint-disable no-unused-vars */
import 'pixi'
import 'p2'
import Phaser from 'phaser'
import { addAnimation } from './util.js'
import { DIRECTIONS } from './Const.js'
/* eslint-enable no-unused-vars */

export default class extends Phaser.Sprite {
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)
        this.anchor.setTo(0.5)
        this.died = false

        this.scale.setTo(16 / 24, 16 / 24)
        addAnimation(this, 'right', [[3, 4, 16], [3, 6, 16], [7, 0, 16]], 20)
        addAnimation(this, 'left', [[3, 0, 16], [3, 2, 16], [7, 0, 16]], 20)
        addAnimation(this, 'up', [[3, 1, 16], [3, 3, 16], [7, 0, 16]], 20)
        addAnimation(this, 'down', [[3, 5, 16], [3, 7, 16], [7, 0, 16]], 20)
        addAnimation(this, 'stop', [[7, 0, 16]], 20)
        addAnimation(this, 'die', [[7, 4, 16], [7, 5, 16], [7, 6, 16], [7, 7, 16], [7, 8, 16], [7, 9, 16], [7, 10, 16], [7, 11, 16], [7, 12, 16], [7, 13, 16], [7, 14, 16]], 20)

        // add sound
        this.chompSound = game.add.audio('chomp')
        this.dieSound = game.add.audio('die')

        this.game.physics.arcade.enable(this)
        this.animations.play('stop')
        this.cursors = this.game.input.keyboard.createCursorKeys()
    }

    update () {
        // this.game.physics.arcade.collide(this.pacman, this.layer)
        // this.game.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this)
        if (this.died) {
            this.body.velocity.x = 0
            this.body.velocity.y = 0
            return
        }
        if (this.lastPressed) {
            if (this.lastPressed === DIRECTIONS.LEFT) {
                this.body.velocity.x = -90
            } else if (this.lastPressed === DIRECTIONS.RIGHT) {
                this.body.velocity.x = 90
            } else if (this.lastPressed === DIRECTIONS.UP) {
                this.body.velocity.y = -90
            } else {
                this.body.velocity.y = 90
            }
        }
        if (this.cursors.left.isDown) {
            this.go(DIRECTIONS.LEFT)
        } else if (this.cursors.right.isDown) {
            this.go(DIRECTIONS.RIGHT)
        } else if (this.cursors.up.isDown) {
            this.go(DIRECTIONS.UP)
        } else if (this.cursors.down.isDown) {
            this.go(DIRECTIONS.DOWN)
        }

        if (this.body.position.x > this.body.prev.x) {
            this.animations.play('right')
            if (!this.chompSound.isPlaying) {
                this.chompSound.play()
            }
        } else if (this.body.position.x < this.body.prev.x) {
            this.animations.play('left')
            if (!this.chompSound.isPlaying) {
                this.chompSound.play()
            }
        } else if (this.body.position.y > this.body.prev.y) {
            this.animations.play('down')
            if (!this.chompSound.isPlaying) {
                this.chompSound.play()
            }
        } else if (this.body.position.y < this.body.prev.y) {
            this.animations.play('up')
            if (!this.chompSound.isPlaying) {
                this.chompSound.play()
            }
        } else {
            this.animations.stop()
            if (this.chompSound.isPlaying) {
                this.chompSound.stop()
            }
        }

        if (this.body.position.x < 0) {
            this.body.position.x = 432
        } else if (this.body.position.x > 432) {
            this.body.position.x = 0
        }
    }
    go (direction) {
        if (direction === DIRECTIONS.LEFT) {
            this.body.velocity.x = -90
            this.lastPressed = DIRECTIONS.LEFT
        } else if (direction === DIRECTIONS.RIGHT) {
            this.body.velocity.x = 90
            this.lastPressed = DIRECTIONS.RIGHT
        } else if (direction === DIRECTIONS.UP) {
            this.body.velocity.y = -90
            this.lastPressed = DIRECTIONS.UP
        } else if (direction === DIRECTIONS.DOWN) {
            this.body.velocity.y = 90
            this.lastPressed = DIRECTIONS.DOWN
        }
    }
}
