import Vue from 'vue'
import Vuex from 'vuex'
import 'pixi'
import 'p2'
import Phaser from 'phaser'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: true,
        game: null
    },
    getters: {
        loading: state => state.loading,
        game: state => state.game
    },
    mutations: {
        ['UPDATE_LOADING'] (state, loading) {
            state.loading = loading
        },
        ['INIT_GAME'] (state, payload) {
            // state.game = game
            let newGame = new Phaser.Game(payload.width, payload.height, Phaser.AUTO, payload.el, {
                preload: () => payload.preload(),
                create: () => payload.create(),
                update: () => payload.update(),
                render: () => payload.render()
            })
            state.game = newGame
        },
        ['DESTROY_GAME'] (state) {
            state.game.destroy()
            // state.game = null
        }
    },
    actions: {
        isLoading ({ commit, state }) {
            console.log('loading')
            commit('UPDATE_LOADING', true)
        },
        notLoading ({ commit, state }) {
            console.log('not loading')
            commit('UPDATE_LOADING', false)
        },
        initGame ({ commit, state }, payload) {
            commit('INIT_GAME', payload)
        },
        destroyGame ({ commit, state }) {
            commit('DESTROY_GAME')
        }
    }
})
