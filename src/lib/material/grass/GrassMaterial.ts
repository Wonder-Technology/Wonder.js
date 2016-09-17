module wd{
    export class GrassMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsCloneable()
        public map:GrassMap = GrassMap.create(this);

        public init(){
            if(this.map.hasData()){
                this.map.addMap(this.mapManager);
            }

            super.init();
        }

        public getTextureForRenderSort():Texture{
            if(this.map.hasData()){
                return this.map.getTextureForRenderSort();
            }
        }

        public updateShader(cmd:QuadCommand){
            this.map.updateShader(cmd);

            super.updateShader(cmd);
        }

        protected addExtendShaderLib(){
            if(this.map.hasData()){
                this.shader.addLib(GrassMapShaderLib.create());
            }
        }
    }
}

