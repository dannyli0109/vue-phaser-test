<template>
    <div class="container">
        <div class="inner">
            <pacman></pacman>
            <!-- <router-link :to="{ name: 'next'}">next</router-link> -->
        </div>
    </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import Pacman from '../lib/Pacman'
  import Blinky from '../lib/Blinky'
  import PacmanVue from './Pacman.vue'
  /* eslint-enable no-unused-vars */

export default {
      name: 'dashboard',
      components: {
          pacman: PacmanVue
      },
      methods: {
          nextPage () {
              this.$router.push({ path: 'next' })
          }
      },
      computed: {

      },
      mounted () {
      }
}
</script>

<style lang="scss" scoped>
// @import '../../assets/sass/tools';

.dashboard {
    background: transparent;
}
.container {
    background-color: black;
    position: relative;


    // .inner {
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     // width: 100%;
    // }
}

</style>
