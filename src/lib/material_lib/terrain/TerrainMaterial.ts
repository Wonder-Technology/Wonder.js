module wd{
    export class TerrainMaterial extends LightMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }

        public layer:Layer = Layer.create();

        public init(){
            this.mapManager.addArrayMap("u_layerSampler2Ds", this.layer.mapArray);

            super.init();
        }

        protected addExtendShaderLib(){
            if(this.layer.mapDataList.getCount() > 0){
                this.shader.addLib(TerrainLayerShaderLib.create());
            }
        }
    }

    class Layer{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _mapDataList:wdCb.Collection<TerrainLayerMapData> = wdCb.Collection.create<TerrainLayerMapData>();
        @requireSetter(function(mapDataList:wdCb.Collection<TerrainLayerMapData>){
            mapDataList.forEach((mapData:TerrainLayerMapData) => {
                assert(mapData.minHeight < mapData.maxHeight, Log.info.FUNC_SHOULD("minHeight", "< maxHeight"));
            });

            mapDataList.forEach((mapData:TerrainLayerMapData) => {
                mapDataList
                    .filter((data:TerrainLayerMapData) => {
                        return data.minHeight !== mapData.minHeight || data.maxHeight !== mapData.maxHeight;
                    })
                    .forEach((data:TerrainLayerMapData) => {
                        assert(mapData.minHeight >= data.maxHeight || mapData.maxHeight <= data.minHeight, Log.info.FUNC_SHOULD_NOT("height range", "overlap"));
                });
            });

            assert(mapDataList.getCount() <= GPUDetector.getInstance().maxTextureUnit, Log.info.FUNC_SHOULD_NOT("count of maps", `exceed maxTextureUnit:${GPUDetector.getInstance().maxTextureUnit}, but actual is ${mapDataList.getCount()}`));
        })
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
    }

    export type TerrainLayerMapData = {
        minHeight:number;
        maxHeight:number;
        diffuseMap:Texture;
    }
}

