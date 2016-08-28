module wd{
    export class TerrainBumpShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "terrainMix_bump";

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
                this.fsSourceFuncDefine = ShaderChunk.terrainMix_bump_cotangentFrame_standardDerivatives.funcDefine + this.fsSourceFuncDefine;
            }
            else{
                this.fsSourceFuncDefine = ShaderChunk.terrainMix_bump_cotangentFrame_fallback.funcDefine + this.fsSourceFuncDefine;
            }
        }
    }
}

