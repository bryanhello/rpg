import JsonMapParser, {collideMap} from "./jsonMapParser.ts";
import Player from "../entities/player.ts";


type mapLayer = {
    "ground" : {
        "image": HTMLImageElement,
        "layer": 0
    },
    "treeTrunkAndBushes" : {
        "image": HTMLImageElement,
        "layer": 1
    },

    "player" : {
        "player": Player,
        "image": HTMLImageElement,
        "layer": 2
    }
    "decorations" : {
        "image": HTMLImageElement,
        "layer": 3
    },
    "treeLeaves" : {
        "image": HTMLImageElement,
        "layer": 3
    },
    "clouds" : {
        "image": HTMLImageElement,
        "layer": 4
    }
}
export default class Map{
    public  collideMap: collideMap[]
    public  mapToLoad: string
    public canvas: HTMLCanvasElement
    public  mapLayer : mapLayer
    constructor(mapToLoad: string, canvas: HTMLCanvasElement, player: Player) {
        this.canvas = canvas
        this.collideMap = []

        this.mapToLoad = mapToLoad
        this.mapLayer = {
            "ground" : {
                "image": new Image(),
                "layer": 0
            },
            "treeTrunkAndBushes" : {
                "image": new Image(),
                "layer": 1
            },

            "player" : {
                "player": player,
                "image": player.getSprite(),
                "layer": 2
            },
            "decorations" : {
                "image": new Image(),
                "layer": 3
            },
            "treeLeaves" : {
                "image": new Image(),
                "layer": 3
            },
            "clouds" : {
                "image": new Image(),
                "layer": 4
            }
        }
        this.init()
    }
    init(){
        const data = import(`../../public/map/${this.mapToLoad}/jsonMap/collide.json`)
        data.then((data) => {
            const xml: JsonMapParser = new JsonMapParser([data.layers[0]])
            this.collideMap = xml.collideArray
            this.createCollideBlock()
            this.loadMap()
        })
    }
    createCollideBlock(){
        const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.collideMap.forEach((block: collideMap) => {
            ctx.fillRect(block.x, block.y, block.width, block.height)

        })
    }

    loadMap(){
        Object.keys(this.mapLayer).forEach((key) => {
            try {
                // @ts-ignore
                if(key != 'player') this.mapLayer[key].image.src = `../../public/map/${this.mapToLoad}/${key}.png`
                // @ts-ignore
                console.log(this.mapLayer[key].image.src)
                if(key == 'player') this.mapLayer[key].image.src = `../../public/entities/player/${this.mapLayer[key].player.getMovement()}/${this.mapLayer[key].player.getMovement()}${this.mapLayer[key].player.getDirection()}${this.mapLayer[key].player.getCurrentFrame()}.png`
            }catch (e) {
                console.log(e)
            }

        })
    }

    update(){
        Object.keys(this.mapLayer).forEach((key) => {

            const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
            // @ts-ignore

            // @ts-ignore
            if(key != 'player') ctx.drawImage(this.mapLayer[key].image, 0, 0)
                // @ts-ignore
            else ctx.drawImage(this.mapLayer[key].image, this.mapLayer[key].player.getPosition().getX(), this.mapLayer[key].player.getPosition().getY())

        })
    }
}