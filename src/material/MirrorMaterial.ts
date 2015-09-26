/// <reference path="../definitions.d.ts"/>
module dy{
    //todo refactor?
    export class MirrorMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _reflectionMap:MirrorTexture = null;
        get reflectionMap(){
            return this._reflectionMap;
        }
        set reflectionMap(reflectionMap:MirrorTexture){
            this.addMap(reflectionMap, {
                samplerVariableName: VariableNameTable.getVariableName("mirrorReflectionMap")
            });

            this._reflectionMap = reflectionMap;
        }

        public init(){
            this.shader.addLib(dy.MirrorShaderLib.getInstance());

            super.init();
        }
    }
}

