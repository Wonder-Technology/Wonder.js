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

        //todo assert bump->repeatRegion should equal corresponding diffuse map
        //todo assert bump maps' length should be 3
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

            if(this.mapData.bumpMap1){
                let bumpMap = this.mapData.bumpMap1;

                this._setBumpMapRepeatRegion(bumpMap, this.mapData.diffuseMap1);

                mapManager.addMap(bumpMap, {
                    samplerVariableName: VariableNameTable.getVariableName("bumpMap1")
                });
            }

            if(this.mapData.bumpMap2){
                let bumpMap = this.mapData.bumpMap2;

                this._setBumpMapRepeatRegion(bumpMap, this.mapData.diffuseMap2);

                mapManager.addMap(bumpMap, {
                    samplerVariableName: VariableNameTable.getVariableName("bumpMap2")
                });
            }

            if(this.mapData.bumpMap3){
                let bumpMap = this.mapData.bumpMap3;

                this._setBumpMapRepeatRegion(bumpMap, this.mapData.diffuseMap3);

                mapManager.addMap(bumpMap, {
                    samplerVariableName: VariableNameTable.getVariableName("bumpMap3")
                });
            }
        }

        public hasData(){
            for(let key in this.mapData){
                if(this.mapData.hasOwnProperty(key)){
                    return true;
                }
            }

            return false;
        }

        public hasBumpMap(){
            return this.mapData.bumpMap1 instanceof ImageTexture;
        }

        public getTextureForRenderSort(){
            return this.mapData.mixMap;
        }

        public clone(){
            return CloneUtils.clone(this);
        }

        private _setBumpMapRepeatRegion(bumpMap:ImageTexture, diffuseMap:ImageTexture|ProceduralTexture){
            bumpMap.wrapS = diffuseMap.wrapS;
            bumpMap.wrapT = diffuseMap.wrapT;
        }
    }

    export type TerrainMixData = {
        mixMap:ImageTexture|ProceduralTexture;
        diffuseMap1:ImageTexture|ProceduralTexture;
        diffuseMap2:ImageTexture|ProceduralTexture;
        diffuseMap3:ImageTexture|ProceduralTexture;
        bumpMap1:ImageTexture;
        bumpMap2:ImageTexture;
        bumpMap3:ImageTexture;
    }
}
