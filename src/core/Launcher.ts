

export default class Launcher{
    private readonly document: Document
    public canvas: HTMLCanvasElement

    constructor(document: Document){
        this.document = document
        this.canvas = document.createElement('canvas')
        this.init()
    }
    init(){
        this.canvas.width = 600
        this.canvas.height = 600
        this.canvas.style.backgroundColor = 'black'
        this.document.body.appendChild(this.canvas)
    }

}