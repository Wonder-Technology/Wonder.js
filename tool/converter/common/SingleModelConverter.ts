import wdFrp = require("wonder-frp");

export abstract class SingleModelConverter {
    constructor(version:string) {
        this.version = version;
    }

    public abstract name:string;

    public version:string = null;

    public abstract convert(fileBuffer:Buffer, filePath:string):wdFrp.Stream;

    protected convertSceneData(resultJson:any, nodeName:string) {
        resultJson.scene = "Scene";

        resultJson.scenes = {
            Scene:{
                nodes:[nodeName]
            }
        };

    }

    protected convertAssetData() {
        var result:any = {};

        result.version = this.version;
        result.generator = this.name;

        return result;
    }
}

