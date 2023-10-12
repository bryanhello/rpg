import Vec3 from "../utils/Vec3.ts";
export default class Entity{
    protected readonly canvas: HTMLCanvasElement
    protected name: string
    protected sprite: HTMLImageElement
    protected position: Vec3
    protected width: number
    protected height: number
    protected speed: number
    protected direction: string
    protected numberOfFrame: number
    protected currentFrame: number
    protected movement: string = 'idle'

    constructor(canvas: HTMLCanvasElement, name: string, position: Vec3, speed: number, direction: string) {
        this.canvas = canvas
        this.name = name
        this.sprite = new Image()
        this.numberOfFrame = 0
        this.currentFrame = 1
        this.direction = direction

        this.sprite.src = `./entities/${this.name}/${this.movement}/${this.movement}${this.direction}${this.currentFrame}.png`
        this.position = position
        this.width = this.sprite.width
        this.height = this.sprite.height
        this.speed = speed
    }
    init(){
        this.sprite.onload = () => {
            const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
            ctx.drawImage(this.sprite, this.position.getX(), this.position.getY())
        }
    }
    update(){
        const ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        ctx.drawImage(this.sprite, this.position.getX(), this.position.getY())
    }
    move(..._args: any[]){

    }
    resetMovement(..._arsg: any[]){

    }
    getPosition(){
        return this.position
    }
    setPosition(position: Vec3){
        this.position = position
    }
    getSpeed(){
        return this.speed
    }
    setSpeed(speed: number){
        this.speed = speed
    }
    getDirection(){
        return this.direction
    }
    setDirection(direction: string){
        this.direction = direction
    }
    getNumberOfFrame(){
        return this.numberOfFrame
    }
    setNumberOfFrame(numberOfFrame: number){
        this.numberOfFrame = numberOfFrame
    }
    getCurrentFrame(){
        return this.currentFrame
    }
    setCurrentFrame(currentFrame: number){
        this.currentFrame = currentFrame
    }
    getWidth(){
        return this.width
    }
    setWidth(width: number){
        this.width = width
    }
    getHeight(){
        return this.height
    }
    setHeight(height: number){
        this.height = height
    }
    getName(){
        return this.name
    }
}