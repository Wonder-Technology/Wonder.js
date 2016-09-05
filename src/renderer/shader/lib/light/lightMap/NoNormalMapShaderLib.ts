module wd{
    export class NoNormalMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noNormalMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
        }

        public setShaderDefinition(cmd:QuadCommand, material:TerrainMaterial){
            var noNormalMap_light_fragment:GLSLChunk = null;

            super.setShaderDefinition(cmd, material);

            noNormalMap_light_fragment = ShaderChunk.noNormalMap_light_fragment;

            this.fsSourceVarDeclare = noNormalMap_light_fragment.varDeclare;
            this.fsSourceFuncDefine += noNormalMap_light_fragment.funcDefine;
        }
    }
}

