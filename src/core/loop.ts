import Entity from "../entities/entity.ts";
import Map from "../map/map.ts";
import {playerBinds} from "../settings/keyBinds.ts";
import Player from "../entities/player.ts";

export default class Loop {
    public entities: Entity[]
    public player : Player
    public map: Map
    public canvas: HTMLCanvasElement
    public document: Document
    constructor(canvas: HTMLCanvasElement, map: Map, entities: Entity[], document: Document, player: Player) {
        this.entities = entities
        this.map = map
        this.canvas = canvas
        this.document = document
        this.player = player
    }
    update(){
        this.map.update()
        setTimeout(() => {
            this.update()
        }, 1000/100)
    }

    checkKeyboardEvent(eventKey: string[]){
        const playerKeys = playerBinds.move
        eventKey.forEach((key: string) => {
            if(playerKeys.includes(key)){
                this.player.move(key)
            }
        })
    }

}