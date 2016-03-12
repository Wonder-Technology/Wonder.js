module wd{
    export class MirrorMaterial extends LightMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }

        get reflectionMap(){
            return this.mapManager.getReflectionMap();
        }
        set reflectionMap(reflectionMap:Texture){
            this.mapManager.setReflectionMap(reflectionMap);
        }

        protected addExtendShaderLib(){
            if(this.reflectionMap){
                this.shader.addLib(MirrorShaderLib.create());
            }
        }
    }
}

