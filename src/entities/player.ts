import Entity from "./entity.ts";
import Vec3 from "../utils/Vec3.ts";

export default class Player extends Entity {
    protected movement: string = 'idle'

    constructor(canvas: HTMLCanvasElement, name: string, position: Vec3, speed: number, direction: string) {
        super(canvas, name, position, speed, direction);
        this.numberOfFrame = 2
    }
    move(key: string){
        this.movement = 'Walking'
        this.numberOfFrame = 4
        switch(key){
            case ('z' || 'ArrowUp'):
                this.position = new Vec3(this.position.getX(), this.position.getY() - this.speed)
                this.direction = 'Up'
                break
            case ('s' || 'ArrowDown'):
                this.position = new Vec3(this.position.getX(), this.position.getY() + this.speed)
                this.direction = 'Down'
                break
            case ('q' || 'ArrowLeft'):
                this.position = new Vec3(this.position.getX() - this.speed, this.position.getY())
                this.direction = 'Left'
                break
            case ('d' || 'ArrowRight'):
                this.position = new Vec3(this.position.getX() + this.speed, this.position.getY())
                this.direction = 'Right'
                break
        }

    }
    resetMovement(){
        this.numberOfFrame = 2
        this.movement = 'idle'
    }
    update(){
        this.sprite.src = `./entities/${this.name}/${this.movement}/${this.movement}${this.direction}${this.currentFrame}.png`
        if(this.currentFrame === this.numberOfFrame || this.currentFrame > this.numberOfFrame){
            this.currentFrame = 1
        } else {
            this.currentFrame++
        }
        super.update()
    }
}