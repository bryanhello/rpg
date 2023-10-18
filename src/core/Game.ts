import Launcher from "./Launcher.ts";
import Map from "../map/map.ts";
import Entity from "../entities/entity.ts";
import Loop from "./loop.ts";
import Player from "../entities/player.ts";
import Vec3 from "../utils/Vec3.ts";

export default class Game {
    protected readonly launcher: Launcher
    protected readonly canvas: HTMLCanvasElement
    protected readonly with: number
    protected readonly height: number
    private readonly map: Map
    private player: Player
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

        this.player = new Player(this.canvas, 'player', new Vec3(this.with/2,this.height/2), 3, 'Down')
        this.map = new Map(this.mapLoaded, this.canvas, this.player)
        this.loop = new Loop(this.canvas, this.map, this.entities, this.document, this.player)
    }
    init(){
        this.map.init()
        this.update()
    }
    update(){
        this.loop.update()
    }
    addEntity(entity: Entity){
        entity.init()
        this.entities.push(entity)
    }
    addPlayer(player: Player){

        this.player = player
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
    getPlayer(){
        return this.player
    }


}