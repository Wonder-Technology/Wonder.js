module wd{
    export class MirrorMaterial extends StandardLightMaterial{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _reflectionMap:Texture = null;
        @cloneAttributeAsCloneable()
        get reflectionMap(){
            return this._reflectionMap;
        }
        set reflectionMap(reflectionMap:Texture){
            this.mapManager.addMap(reflectionMap, {
                samplerVariableName: VariableNameTable.getVariableName("reflectionMap")
            });

            this._reflectionMap = reflectionMap;
        }

        public getTextureForRenderSort():Texture{
            return this.reflectionMap;
        }

        protected addExtendShaderLib(){
            if(this.reflectionMap){
                this.shader.addLib(MirrorShaderLib.create());
            }
        }
    }
}

