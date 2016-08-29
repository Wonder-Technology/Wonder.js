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
        @cloneAttributeAsCustomType(function(source:TerrainMix, target:TerrainMix, memberName:string){
            var s = source[memberName],
                t = target[memberName];

            for(let key in s){
                t[key] = s[key].clone();
            }
        })
        get mapData(){
            return this._mapData;
        }
        set mapData(mapData:TerrainMixData){
            this._mapData = mapData;
        }

        @require(function(mapManager:MapManager){
            it("mapData at least should has mixMap and 3 diffuseMaps", () => {
                var mapData = this.mapData;

                expect(mapData.mixMap).exist;
                expect(mapData.diffuseMap1).exist;
                expect(mapData.diffuseMap2).exist;
                expect(mapData.diffuseMap3).exist;
            });
            it("if has bump map, bump map should be ImageTexture", () => {
                if(this.hasBumpMap()){
                    let mapData = this.mapData;

                    expect(mapData.bumpMap1).instanceOf(ImageTexture);
                    expect(mapData.bumpMap2).instanceOf(ImageTexture);
                    expect(mapData.bumpMap3).instanceOf(ImageTexture);
                }
            });
        })
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

            if(this.hasBumpMap()){
                this._addBumpMap(mapManager, this.mapData.bumpMap1, this.mapData.diffuseMap1, "bumpMap1");
                this._addBumpMap(mapManager, this.mapData.bumpMap2, this.mapData.diffuseMap2, "bumpMap2");
                this._addBumpMap(mapManager, this.mapData.bumpMap3, this.mapData.diffuseMap3, "bumpMap3");
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

        @ensure(function(hasBumpMap:boolean){
            it("if has bump map, should has 3 bump maps", () => {
                if(hasBumpMap){
                    let mapData = this.mapData;

                    expect(mapData.bumpMap1).exist;
                    expect(mapData.bumpMap2).exist;
                    expect(mapData.bumpMap3).exist;
                }
            });
        })
        public hasBumpMap(){
            return !!this.mapData.bumpMap1 || !!this.mapData.bumpMap2 || !!this.mapData.bumpMap3;
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

        private _addBumpMap(mapManager:MapManager, bumpMap:ImageTexture, correspondDiffuseMap:ImageTexture|ProceduralTexture, samplerVariableName:string){
            this._setBumpMapRepeatRegion(bumpMap, correspondDiffuseMap);

            mapManager.addMap(bumpMap, {
                samplerVariableName: VariableNameTable.getVariableName(samplerVariableName)
            });
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
