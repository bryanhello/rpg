import JsonMapParser, {collideMap} from "./jsonMapParser.ts";


export default class Map{
    public  collideMap: collideMap[]
    public  mapToLoad: string
    public  map: { image:HTMLImageElement, layer:number }[]
    public canvas: HTMLCanvasElement
    constructor(mapToLoad: string, canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.collideMap = []
        this.map = []
        this.mapToLoad = mapToLoad
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
        const groundImage = new Image()
        const decoImage = new Image()
        const treesImage = new Image()
        try{
            groundImage.src = `public/map/${this.mapToLoad}/ground.png`
            decoImage.src = `public/map/${this.mapToLoad}/deco.png`
            treesImage.src = `public/map/${this.mapToLoad}/trees.png`
            this.map.push({image:groundImage, layer:0},
                {image: treesImage, layer: 2},{image: decoImage, layer: 2})
        } catch (e) {
            console.log(e)
        }
        this.map.forEach((img: { image:HTMLImageElement, layer:number }) => {
            img.image.onload = () => {
                const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
                ctx.drawImage(img.image, 0, 0)
            }
        })
    }
    update(){
        this.map.forEach((img: { image:HTMLImageElement, layer:number }) => {
            const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
            ctx.drawImage(img.image, 0, 0)
        })
    }
}