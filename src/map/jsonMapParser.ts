
export type collideMap = {
    height: number;
    width: number;
    x: number;
    y: number;
}

export type JsonMap = {

        draworder: string;
        name: string;
        objects: collideMap[];

}

export default class JsonMapParser {
    protected readonly JsonMapFile: JsonMap[];
    public readonly collideArray: {height: number;
        width: number;
        x: number;
        y: number;}[];

    constructor(file: JsonMap[]) {
        this.JsonMapFile = file;
        this.collideArray = [];
        this.parseJsonMap()

    }

    parseJsonMap() {
        this.JsonMapFile.map((layer) => {
                layer.objects.map((object) => {
                        this.collideArray.push(object)
                    }
                )
            }
        )
    }
}