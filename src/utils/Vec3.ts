
export default class Vec3{
    x: number
    y: number
    z: number | undefined
    constructor(x: number, y: number, z: number = 0) {
        this.x = x
        this.y = y
        if(z) this.z = z
    }
    getX(){
        return this.x
    }
    getY(){
        return this.y
    }
    getZ(){
        return this.z
    }
}