module wd{
    //todo support normal map
    export class TerrainLayer{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _mapData:Array<TerrainLayerData> = [];
        @requireSetter(function(mapData:Array<TerrainLayerData>){
            it("mapData should be Array type", function () {
                expect(mapData).be.a("array");
            });
            it("minHeight should < maxHeight", function () {
                mapData.forEach((data:TerrainLayerData) => {
                    expect(data.minHeight).lessThan(data.maxHeight);
                });
            });
            it("height range should not overlap", function () {
                mapData.forEach((data1:TerrainLayerData) => {
                    mapData.filter((data2:TerrainLayerData) => {
                            return data2.minHeight !== data1.minHeight || data2.maxHeight !== data1.maxHeight;
                        })
                        .forEach((data2:TerrainLayerData) => {
                            expect(data1.minHeight >= data2.maxHeight || data1.maxHeight <= data2.minHeight).true;
                        });
                });
            });
        })
        @cloneAttributeAsCustomType(function(source:TerrainLayer, target:TerrainLayer, memberName:string){
            var s = source[memberName],
                t:Array<TerrainLayerData> = [];

            for(let data of s){
                t.push({
                    minHeight:data.minHeight,
                    maxHeight:data.maxHeight,
                    diffuseMap:data.diffuseMap.clone()
                })
            }

            target[memberName] = t;
        })
        get mapData(){
            return this._mapData;
        }
        set mapData(mapData:Array<TerrainLayerData>){
            this._mapData = mapData;
        }

        @ensureGetter(function(mapArray:Array<Texture>){
            it("should return Array<Texture>", () => {
                expect(mapArray).be.a("array");
                for(let map of mapArray){
                    expect(map).instanceOf(Texture);
                }
            });
        })
        get mapArray(){
            return this._mapData.map((data:TerrainLayerData) => {
                return data.diffuseMap;
            });
        }

        public addMap(mapManager:MapManager){
            mapManager.addMapArray("u_layerSampler2Ds", this.mapArray);
        }

        public hasData(){
            return this.mapData.length > 0;
        }

        public getMapCount(){
            return this.mapData.length;
        }

        public getTextureForRenderSort(){
            return this.mapArray[0];
        }

        //todo support blend
        //public blendMethod:ETerrainLayerBlendMethod = ETerrainLayerBlendMethod.CUT;

        public clone(){
            return CloneUtils.clone(this);
        }
    }

    export type TerrainLayerData = {
        minHeight:number;
        maxHeight:number;
        diffuseMap:ImageTexture|ProceduralTexture;
    }
}
