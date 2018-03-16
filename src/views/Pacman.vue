<template>
    <div id='gameScreen'>
      <button @click="resetGame">reset</button>
    </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import Pacman from '../lib/Pacman'
  import Blinky from '../lib/Blinky'
  import { DIRECTIONS } from '../lib/Const'
  import Swipe from 'phaser-swipe'

  /* eslint-enable no-unused-vars */

export default {
      name: 'pacman',
      props: {
          width: Number,
          height: Number
      },
      data () {
          return {
              pacman: null,
              cursor: null,
              map: null,
              layer: null,
              lastPressed: null,
              score: 0
          }
      },
      mounted () {
          this.newGame()
      },
      methods: {
          preload () {
            this.game.time.advancedTiming = true;

            this.game.load.spritesheet('dot', '/generic/vue-phaser-test/pacman/dot.png')
            this.game.load.spritesheet('pacman', '/generic/vue-phaser-test/pacman/pacman.png', 24, 24)
            this.game.load.image('tiles', '/generic/vue-phaser-test/pacman/pacman-tiles.png')
            this.game.load.image('door', '/generic/vue-phaser-test/pacman/door.png')
            this.game.load.tilemap('map', '/generic/vue-phaser-test/pacman/pacman-map.json', null, Phaser.Tilemap.TILED_JSON)
            this.game.load.audio('chomp', '/generic/vue-phaser-test/pacman/pacman_chomp.wav')
            this.game.load.audio('die', '/generic/vue-phaser-test/pacman/pacman-death-sound.mp3')

            // this.game.load.spritesheet('dot', '/pacman/dot.png')
            // this.game.load.spritesheet('pacman', '/pacman/pacman.png', 24, 24)
            // this.game.load.image('tiles', '/pacman/pacman-tiles.png')
            // this.game.load.image('door', '/pacman/door.png')
            // this.game.load.tilemap('map', '/pacman/pacman-map.json', null, Phaser.Tilemap.TILED_JSON)
            // this.game.load.audio('chomp', '/pacman/pacman_chomp.wav')
            // this.game.load.audio('die', '/pacman/pacman-death-sound.mp3')
          },
          create (phaser) {
              this.game.time.desiredFps = 30;
              this.swipe = new Swipe(this.game)
              this.pacman = new Pacman({
                  game: this.game,
                  x: 22,
                  y: 22,
                  asset: 'pacman'
              })

              this.blinky = new Blinky({
                  game: this.game,
                  x: 50,
                  y: 22,
                  asset: 'pacman'
              })
              // add the map
              this.map = this.game.add.tilemap('map')
              this.map.addTilesetImage('pacman-tiles', 'tiles')
              this.map.addTilesetImage('door', 'door')

              this.layer = this.map.createLayer('Pacman')
              this.layer.resizeWorld()

            //   this.dots = this.game.add.physicsGroup()

            //   // add the dot
            //   this.map.createFromTiles(7, 14, 'dot', this.layer, this.dots)

            //   this.dots.setAll('x', 6, false, false, 1)
            //   this.dots.setAll('y', 6, false, false, 1)

              this.map.setCollisionByExclusion([7], true, this.layer)

              this.game.add.existing(this.pacman)
              this.game.add.existing(this.blinky)

              this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
              this.game.scale.setShowAll()
              this.game.scale.maxHeight = 496
              this.game.scale.maxWidth = 448
              window.addEventListener(
                  'resize', () => {
                      this.game.scale.refresh()
                  }
              )
              this.game.scale.refresh()

              this.cursors = this.game.input.keyboard.createCursorKeys()
              // this.$store.dispatch('notLoading')
          },
          update (phaser) {
              let direction = this.swipe.check()
              if (direction !== null) {
                  // direction= { x: x, y: y, direction: direction }
                  switch (direction.direction) {
                      case this.swipe.DIRECTION_LEFT:
                          this.pacman.go(DIRECTIONS.LEFT)
                          break
                      case this.swipe.DIRECTION_RIGHT:
                          this.pacman.go(DIRECTIONS.RIGHT)
                          break
                      case this.swipe.DIRECTION_UP:
                          this.pacman.go(DIRECTIONS.UP)
                          break
                      case this.swipe.DIRECTION_DOWN:
                          this.pacman.go(DIRECTIONS.DOWN)
                          break
                      case this.swipe.DIRECTION_UP_LEFT:
                          break
                      case this.swipe.DIRECTION_UP_RIGHT:
                          break
                      case this.swipe.DIRECTION_DOWN_LEFT:
                          break
                      case this.swipe.DIRECTION_DOWN_RIGHT:
                          break
                  }
              }
              this.game.physics.arcade.collide(this.pacman, this.layer, this.collide, null, this)
              this.game.physics.arcade.collide(this.blinky, this.layer)
            //   this.game.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this)
              this.game.physics.arcade.overlap(this.pacman, this.blinky, this.die, null, this)
          },
          render (phaser) {
              this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00")  
          },
          eatDot (pacman, dot) {
              this.score += 100
              dot.kill()
          },
          collide () {
              // console.log('collide')
          },
          die (pacman, blinky) {
              pacman.died = true
              pacman.body.velocity.x = 0
              pacman.body.velocity.y = 0
              pacman.animations.play('die', 10, false)
              if (!pacman.dieSound.isPlaying) {
                  pacman.dieSound.play()
              }
              pacman.animations.currentAnim.onComplete.add(() => pacman.kill(), this)
          },
          newGame () {
              this.$store.dispatch('initGame', {
                  width: 448,
                  height: 496,
                  el: this.$el,
                  preload: this.preload,
                  create: this.create,
                  update: this.update,
                  render: this.render
              })
          },
          resetGame () {
              this.dots.hash.forEach(dot => {
                  dot.reset(dot.position.x, dot.position.y)
              })
              this.pacman.reset(22, 22)
              this.pacman.body.velocity.x = 0
              this.pacman.body.velocity.y = 0
              this.pacman.lastPressed = null
              this.pacman.died = false
              this.pacman.play('stop')
          }
      },
      watch: {
          loading (not) {
              if (not) {
                  this.newGame()
              } else {
                  this.$store.dispatch('destroyGame')
              }
          }
      },
      computed: {
          game () {
              return this.$store.getters.game
          },
          loading () {
              return this.$store.getters.loading
          },
          sprite () {
            //   return require('./static/pacman/' + this.id + '.png')
          }
      }
}
</script>

<style lang="scss" scoped>
// @import '../../assets/sass/tools';

.dashboard {
    background: transparent;
}

#gameScreen {
    width: 100%;
    height: 100%;
    margin: auto;
}
</style>
