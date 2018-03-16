var path = require('path')
var phaserModule = path.join(__dirname, './node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
    baseUrl: 'generic/vue-phaser-test/',    
    configureWebpack: { 
        entry: {
            vendor: ['pixi', 'p2', 'phaser']
        },
        resolve: {
            alias: {
                'phaser': phaser,
                'pixi': pixi,
                'p2': p2
            }
        },
        module: {
            rules: [
                { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
                { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
                { test: /p2\.js/, use: ['expose-loader?p2'] }
            ]
        }
    }
}