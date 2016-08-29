module wd{
    export class TerrainMixBumpShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrain_mix_bump";

        public setShaderDefinition(cmd:QuadCommand, material:TerrainMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(
                [
                    VariableNameTable.getVariableName("bumpMap1"),
                    VariableNameTable.getVariableName("bumpMap2"),
                    VariableNameTable.getVariableName("bumpMap3")
                ]
            );

            if(GPUDetector.getInstance().extensionStandardDerivatives){
                this.fsSourceExtensionList.addChild("GL_OES_standard_derivatives");
                this.fsSourceFuncDefine = ShaderChunk.terrain_mix_bump_cotangentFrame_standardDerivatives.funcDefine + this.fsSourceFuncDefine;
            }
            else{
                this.fsSourceFuncDefine = ShaderChunk.terrain_mix_bump_cotangentFrame_fallback.funcDefine + this.fsSourceFuncDefine;
            }
        }
    }
}

