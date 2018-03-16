# Phaser R&D

## Browsers / Devices support

- Supports Chrome and Safari on the desktop, but Safari experienced much lower performance.
- Supports Android and IOS device as well, but the frame rate is low (might because of tile sprites according to [here](http://www.emanueleferonato.com/2017/01/05/optimize-your-phaser-html5-games-on-mobile-devices-by-using-more-sprites-and-less-tilesprites/), might be fixed by using normal sprites)

## How to integrate different mini games with the same SPA (vuejs)

- Having multiple instances of phaser game is allowed, we store the game instance in the state when the user first go to the page, and stop the rendering and reset the game state when they leave the page. And we do the same thing for the second page, when they go back to the first page, we resume the rendering and the game will be restarted because we reset the game state when they first leave the page.


## Built in features

- sound => yes
- Audio recording => the phaser library doesn't comes with it but we can use the browser one.
- Sprites are supported as well, and it works pretty good =>
- Multi-touch behavior => yes, see [this](https://phaser.io/examples/v2/input/multi-touch)
- Device orientation =>  Yes, there is variable to check the orientation of the device [reference](http://www.emanueleferonato.com/2015/04/23/how-to-lock-orientation-in-your-html5-responsive-game-using-phaser/)

## Internal API to communicate between the SPA and the mini game?
- This is how the game is being initialized, this will create a 800x600 canvas
```js
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
```
- As the update specify the render function, we can have a method in the vue component call update and specify update: () => this.update() to reference the function. So essentially, they use the same way as other function in the SPA app, and it will be able to communicate with the rest of the SPA

## Risk / Limitations to use it for "A Curious Tale"
- The biggest concern will be the performance issue in mobile, will need to have a look into how to optimise the performance in mobile