module wd{
    export class TerrainMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsCloneable()
        public layer:TerrainLayer = TerrainLayer.create();
        @cloneAttributeAsCloneable()
        public mix:TerrainMix = TerrainMix.create();

        public init(){
            if(this.layer.hasData()){
                this.layer.addMap(this.mapManager);
            }

            if(this.mix.hasData()){
                this.mix.addMap(this.mapManager);
            }

            super.init();
        }

        public getTextureForRenderSort():Texture{
            if(this.layer.hasData()){
                return this.layer.getTextureForRenderSort();
            }

            if(this.mix.hasData()){
                return this.mix.getTextureForRenderSort();
            }
        }

        protected addExtendShaderLib(){
            if(this.layer.hasData()){
                this.shader.addLib(TerrainLayerShaderLib.create());
            }

            if(this.mix.hasData()){
                this.shader.addLib(TerrainMixShaderLib.create());
            }
        }
    }
}

