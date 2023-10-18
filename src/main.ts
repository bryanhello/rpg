import Launcher from "./core/Launcher.ts";
import Game from "./core/Game.ts";
import Player from "./entities/player.ts";
import Vec3 from "./utils/Vec3.ts";
const launcher = new Launcher(document)




const game = new Game(launcher, 'spawn', document)
game.init()
const player = new Player(launcher.canvas, 'player', new Vec3(game.getWith()/2,game.getHeight()/2), 3, 'Down')
player.init()
game.addPlayer(player)
let keys: string[] = []
document.addEventListener('keydown', (event) => {
    keys.includes(event.key) ? null : keys.push(event.key)
    game.loop.checkKeyboardEvent(keys)
})
document.addEventListener('keyup', (event) => {
    keys = keys.filter((key: string) => key !== event.key)
    if (keys.length === 0){
        game.loop.player.resetMovement()
    }
})

