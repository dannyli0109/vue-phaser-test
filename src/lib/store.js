import Vue from 'vue'
import Vuex from 'vuex'

// declare VueX
Vue.use(Vuex)

// create the store instance
export default new Vuex.Store({
    modules: {
        pacman: require('../store/pacman').default
    }
})
