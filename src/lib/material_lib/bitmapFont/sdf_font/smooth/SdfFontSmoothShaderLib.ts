//todo test
module wd{
    export class SdfFontSmoothShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "sdf_font_smooth";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:SdfFontMaterial){
            this.sendUniformData(program, "u_alphaTest", material.alphaTest);
        }

        public setShaderDefinition(cmd:QuadCommand, material:MirrorMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_bitmapSampler", "u_alphaTest"]);

            if(GPUDetector.getInstance().extensionStandardDerivatives){
                this.fsSourceExtensionList.addChild("GL_OES_standard_derivatives");
                this.fsSourceFuncDefine = ShaderChunk.sdf_font_smoothStep_standardDerivatives.funcDefine;
            }
            else{
                this.fsSourceFuncDefine = ShaderChunk.sdf_font_smoothStep_fallback.funcDefine;
            }
        }
    }
}

