export = class DataUtils{
    public static removeNullData(targetJson:any){
        for(let key in targetJson.meshes){
            if(targetJson.meshes.hasOwnProperty(key)){
                let mesh = targetJson.meshes[key];

                for(let primitiveData of mesh.primitives){
                    this._removeFieldWhoseDataAreAllNull(primitiveData, "indices");

                    for(let key in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key)) {
                            this._removeFieldWhoseDataAreAllNull(primitiveData.attributes, key);
                        }
                    }
                }
            }
        }
    }

    private static _removeFieldWhoseDataAreAllNull(data:Object, fieldName:string){
        if(!data[fieldName]){
            return;
        }

        if(data[fieldName].filter((value:number) => {
                return value !== null && value !== void 0;
            }).length === 0){
            delete data[fieldName]
        }
    }

}
