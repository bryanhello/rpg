import Entity from "../entities/entity.ts";
import Map from "../map/map.ts";
import {playerBinds} from "../settings/keyBinds.ts";

export default class Loop {
    public entities: Entity[]
    public map: Map
    public canvas: HTMLCanvasElement
    public document: Document
    constructor(canvas: HTMLCanvasElement, map: Map, entities: Entity[], document: Document) {
        this.entities = entities
        this.map = map
        this.canvas = canvas
        this.document = document
    }
    update(){
        this.map.update()
        this.entities.forEach((entity: Entity) => {
            entity.update()
        })
    }
    checkKeyboardEvent(eventKey: string[]){
        const playerKeys = playerBinds.move
        eventKey.forEach((key: string) => {
            if(playerKeys.includes(key)){
                this.entities[0].move(key)
            }
        })
    }

}