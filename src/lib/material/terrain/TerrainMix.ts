module wd{
    export class TerrainMix{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _mapData:TerrainMixData = <TerrainMixData>{};
        @requireSetter(function(mapData:TerrainMixData){
            it("mapData should be Object type", function () {
                expect(mapData).be.a("object");
            });
        })
        @cloneAttributeAsCloneable()
        get mapData(){
            return this._mapData;
        }
        set mapData(mapData:TerrainMixData){
            this._mapData = mapData;
        }

        //@ensureGetter(function(mapArray:Array<Texture>){
        //    for(let map of mapArray){
        //        assert(map instanceof Texture, Log.info.FUNC_SHOULD("return Array<Texture>"));
        //    }
        //})
        //get mapArray(){
        //    var arr:Array<Texture> = [];
        //
        //    this._mapData.forEach((data:TerrainMixData) => {
        //        arr.push(data.diffuseMap);
        //    });
        //
        //    return arr;
        //}

        public addMap(mapManager:MapManager){
            mapManager.addMap(this.mapData.mixMap, {
                samplerVariableName: VariableNameTable.getVariableName("mixMap")
            });

            mapManager.addMap(this.mapData.diffuseMap1, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap1")
            });
            mapManager.addMap(this.mapData.diffuseMap2, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap2")
            });
            mapManager.addMap(this.mapData.diffuseMap3, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap3")
            });
        }

        public hasData(){
            for(let key in this.mapData){
                if(this.mapData.hasOwnProperty(key)){
                    return true;
                }
            }

            return false;
        }

        public getTextureForRenderSort(){
            return this.mapData.mixMap;
        }

        public clone(){
            return CloneUtils.clone(this);
        }
    }

    export type TerrainMixData = {
        mixMap:Texture;
        diffuseMap1:Texture;
        diffuseMap2:Texture;
        diffuseMap3:Texture;
    }
}
