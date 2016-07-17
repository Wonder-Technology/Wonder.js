module wd{
    export class TerrainMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsCloneable()
        public layer:TerrainLayerMapModel = TerrainLayerMapModel.create();

        public init(){
            this.mapManager.addMapArray("u_layerSampler2Ds", this.layer.mapArray);

            super.init();
        }

        public getTextureForRenderSort():Texture{
            return this.layer.mapArray[0];
        }

        protected addExtendShaderLib(){
            if(this.layer.mapDataList.getCount() > 0){
                this.shader.addLib(TerrainLayerShaderLib.create());
            }
        }
    }

    export class TerrainLayerMapModel{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _mapDataList:wdCb.Collection<TerrainLayerMapData> = wdCb.Collection.create<TerrainLayerMapData>();
        @requireSetter(function(mapDataList:wdCb.Collection<TerrainLayerMapData>){
            it("mapDataList should be Collection type", function () {
                expect(mapDataList).instanceOf(wdCb.Collection);
            });
            it("minHeight should < maxHeight", function () {
                mapDataList.forEach((mapData:TerrainLayerMapData) => {
                    expect(mapData.minHeight).lessThan(mapData.maxHeight);
                });
            });
            it("height range should not overlap", function () {
                mapDataList.forEach((mapData:TerrainLayerMapData) => {
                    mapDataList
                        .filter((data:TerrainLayerMapData) => {
                            return data.minHeight !== mapData.minHeight || data.maxHeight !== mapData.maxHeight;
                        })
                        .forEach((data:TerrainLayerMapData) => {
                            expect(mapData.minHeight >= data.maxHeight || mapData.maxHeight <= data.minHeight).true;
                        });
                });
            });
        })
        @cloneAttributeAsCloneable()
        get mapDataList(){
            return this._mapDataList;
        }
        set mapDataList(mapDataList:wdCb.Collection<TerrainLayerMapData>){
            this._mapDataList = mapDataList;
        }

        @ensureGetter(function(mapArray:Array<Texture>){
            for(let map of mapArray){
                assert(map instanceof Texture, Log.info.FUNC_SHOULD("return Array<Texture>"));
            }
        })
        get mapArray(){
            var arr:Array<Texture> = [];

            this._mapDataList.forEach((data:TerrainLayerMapData) => {
                arr.push(data.diffuseMap);
            });

            return arr;
        }

        //todo support blend
        //public blendMethod:ETerrainLayerBlendMethod = ETerrainLayerBlendMethod.CUT;

        public clone(){
            return CloneUtils.clone(this);
        }
    }

    export type TerrainLayerMapData = {
        minHeight:number;
        maxHeight:number;
        diffuseMap:Texture;
    }
}

