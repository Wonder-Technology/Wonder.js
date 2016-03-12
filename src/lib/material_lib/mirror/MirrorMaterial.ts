module wd{
    export class MirrorMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _reflectionMap:Texture = null;
        get reflectionMap(){
            return this._reflectionMap;
        }
        set reflectionMap(reflectionMap:Texture){
            this.mapManager.addMap(reflectionMap, {
                samplerVariableName: VariableNameTable.getVariableName("reflectionMap")
            });

            this._reflectionMap = reflectionMap;
        }

        protected addExtendShaderLib(){
            if(this.reflectionMap){
                this.shader.addLib(MirrorShaderLib.create());
            }
        }
    }
}

