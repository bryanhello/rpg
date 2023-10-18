import Launcher from "./Launcher.ts";
import Map from "../map/map.ts";
import Entity from "../entities/entity.ts";
import Loop from "./loop.ts";

export default class Game {
    protected readonly launcher: Launcher
    protected readonly canvas: HTMLCanvasElement
    protected readonly with: number
    protected readonly height: number
    private readonly map: Map
    protected mapLoaded: string = 'spawn'
    private entities: Entity[] = []
    public loop: Loop
    private readonly document: Document

    constructor(launcher: Launcher, mapToLoad: string, document: Document) {
        this.launcher = launcher
        this.canvas = launcher.canvas
        this.with = this.canvas.width
        this.height = this.canvas.height
        this.mapLoaded = mapToLoad
        this.document = document
        this.map = new Map(this.mapLoaded, this.canvas)
        this.loop = new Loop(this.canvas, this.map, this.entities, this.document)
    }
    init(){
        this.map.init()
        this.update()
    }
    update(){
        this.loop.update()
        setTimeout(() => {
            this.update()
        }, 1000/60)
    }
    addEntity(entity: Entity){
        this.entities.push(entity)
    }

    getWith(){
        return this.with
    }
    getHeight(){
        return this.height
    }
    getCanvas(){
        return this.canvas
    }
    getDocument(){
        return this.document
    }


}