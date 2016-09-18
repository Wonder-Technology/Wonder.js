module wd{
    export class GrassMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        @cloneAttributeAsCloneable()
        public map:GrassMap = GrassMap.create(this);
        // @cloneAttributeAsCloneable()
        // public instance:GrassInstance = GrassInstance.create(this);

        public init(){
            if(this.map.hasData()){
                this.map.addMap(this.mapManager);
            }
            // else if(this.instance.hasData()){
            //     this.instance.addMap(this.mapManager);
            // }

            super.init();
        }

        public getTextureForRenderSort():Texture{
            if(this.map.hasData()){
                return this.map.getTextureForRenderSort();
            }
            // else if(this.instance.hasData()){
            //     return this.instance.getTextureForRenderSort();
            // }
        }

        public updateShader(cmd:QuadCommand){
            if(this.map.hasData()){
                this.map.updateShader(cmd);
            }

            super.updateShader(cmd);
        }

        protected addExtendShaderLib(){
            if(this.map.hasData()){
                this.shader.addLib(GrassMapShaderLib.create());
            }
            // else if(this.instance.hasData()){
            //     if(InstanceUtils.isHardwareSupport()){
            //         this.shader.addLib(GrassHardwareInstanceShaderLib.create());
            //     }
            //     else{
            //         this.shader.addLib(GrassBatchInstanceShaderLib.create());
            //     }
            // }
        }
    }
}

