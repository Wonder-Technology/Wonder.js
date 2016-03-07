module wd{
    export class TerrainMaterial extends LightMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }

        public layer:Layer = Layer.create();

        public init(){
            //todo sort mapdata

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


        private _mapDataList:wdCb.Collection<TerrainLayerMapData> = null;
        @requireSetter(function(mapDataList:wdCb.Collection<TerrainLayerMapData>){
            //todo check not overlap
            //todo check contain diffuseMap
            //todo check not exceed max unit
        })
        get mapDataList(){
            return this._mapDataList;
        }
        set mapDataList(mapDataList:wdCb.Collection<TerrainLayerMapData>){
            this._mapDataList = mapDataList;
        }

        @ensureGetter(function(mapArray:Array<Texture>){
            //todo check has map
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

