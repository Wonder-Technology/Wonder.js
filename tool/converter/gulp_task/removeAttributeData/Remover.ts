export class Remover {
    public static create() {
        var obj = new this();

        return obj;
    }

    public remove(sourceJson:SourceJsonData, isRemoveNormalData:boolean, isRemoveColorData:boolean):SourceJsonData {
        for(let key in sourceJson.meshes){
            if(sourceJson.meshes.hasOwnProperty(key)){
                let mesh = sourceJson.meshes[key];

                for(let primitiveData of mesh.primitives){
                    let attributes = primitiveData.attributes;

                    if(isRemoveNormalData){
                        delete attributes.NORMAL;
                        delete primitiveData.normalIndices;
                    }

                    if(isRemoveColorData){
                        delete attributes.COLOR;
                        delete primitiveData.colorIndices;
                    }
                }
            }
        }

        return sourceJson;
    }
}

type SourceJsonData = {
    meshes: {
        [id:string]: {
            primitives: Array<SourcePrimitive>
        }
    }
}

type SourceAttribute = {
    NORMAL?:Array<number>;
    COLOR?:Array<number>;
}

type SourcePrimitive = {
    attributes: SourceAttribute;
    verticeIndices: Array<number>;
    normalIndices: Array<number>;
    texCoordIndices: Array<number>;
    colorIndices: Array<number>;
}

