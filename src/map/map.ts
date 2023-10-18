import JsonMapParser, {collideMap} from "./jsonMapParser.ts";

type mapLayer = {
    "ground" : {
        "image": HTMLImageElement,
        "layer": 0
    },
    "treeTrunkAndBushes" : {
        "image": HTMLImageElement,
        "layer": 1
    },
    "decorations" : {
        "image": HTMLImageElement,
        "layer": 1
    },
    "player" : {
        "image": HTMLImageElement,
        "layer": 2
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
    public  map: { image:HTMLImageElement, layer:number }[]
    public canvas: HTMLCanvasElement
    protected mapLayer : mapLayer
    constructor(mapToLoad: string, canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.collideMap = []
        this.map = []
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
            "decorations" : {
                "image": new Image(),
                "layer": 1
            },
            "player" : {
                "image": new Image(),
                "layer": 2
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
          // @ts-ignore
            this.mapLayer[key].image.src = `../../public/map/${this.mapToLoad}/images/${key}.png`
        })
    }

    update(){
        this.map.forEach((img: { image:HTMLImageElement, layer:number }) => {
            const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
            ctx.drawImage(img.image, 0, 0)
        })
    }
}